const { RNA } = require('/opt/schema-layer/rna-schema.js');
const { Answer } = require('/opt/schema-layer/answer-schema.js');

const hasRnaChanged = (oldRna, newRna) => {
	if (!newRna) {
		return false;
	}

	return (
		newRna.communityName !== oldRna.communityName ||
		newRna.location !== oldRna.location ||
		newRna.isCompleted !== oldRna.isCompleted ||
		newRna.communityType !== oldRna.communityType ||
		newRna.affectedHouseholds !== oldRna.affectedHouseholds
	);
};

const getUpdatedRnasModels = (oldRnas, newRnas) =>
	newRnas
		.map((newRna) => {
			const oldRna = oldRnas.find((x) => x.id === newRna.id);

			if (!oldRna) {
				return RNA.put(newRna);
			}

			if (!hasRnaChanged(oldRna, newRna)) {
				return null;
			}

			const {
				communityName,
				communityType,
				location,
				affectedHouseholds,
				isCompleted,
			} = newRna;

			const lastUpdatedOn = new Date().toISOString();

			return RNA.update({
				id: oldRna.id,
				lastUpdatedOn,
				communityName,
				communityType,
				location,
				affectedHouseholds,
				isCompleted,
			});
		})
		.filter((x) => x);

const hasAnswerChanged = (oldAnswer, newAnswer) => {
	if (!newAnswer) {
		return false;
	}

	return (
		newAnswer.value !== oldAnswer.value ||
		JSON.stringify(newAnswer.photos) !== JSON.stringify(oldAnswer.photos) ||
		newAnswer.notes !== oldAnswer.notes
	);
};

const getUpdatedAnswersModels = (oldAnswers, newAnswers) =>
	newAnswers
		.map((newAnswer) => {
			const oldAnswer = oldAnswers.find(
				(x) =>
					x.rnaId === newAnswer.rnaId &&
					x.questionId === newAnswer.questionId
			);

			if (!oldAnswer) {
				return Answer.put(newAnswer);
			}

			if (
				!hasAnswerChanged(oldAnswer, newAnswer) ||
				new Date(oldAnswer.createdOn) > new Date(newAnswer.createdOn)
			) {
				return null;
			}

			const { createdOn, value, photos, notes } = newAnswer;

			return Answer.update({
				id: oldAnswer.id,
				createdOn,
				value,
				photos,
				notes,
			});
		})
		.filter((x) => x);

exports.handler = async (event) => {
	try {
		const { updatedRnas, updatedAnswers } = event;

		/*
	const formattedUpdatedRnas = updatedRnas.map((rna) => {
      const formattedRna = {
        ...rna,
        lastUpdatedOn: rna.lastUpdatedOn
          ? rna.lastUpdatedOn.toISOString()
          : null,
      };

      if (rna.createdOn !== null) {
        formattedRna.createdOn = rna.createdOn.toISOString();
      }

      return formattedRna;
    });

    const formattedUpdatedAnswers = updatedAnswers.map((answer) => ({
      ...answer,
      createdOn: answer.createdOn.toISOString(),
    }));
	*/

		const formattedUpdatedAnswers = updatedAnswers;
		const formattedUpdatedRnas = updatedRnas;

		const updatedRnasModels = getUpdatedRnasModels(
			(await RNA.scan()).Items,
			formattedUpdatedRnas
		);

		const updatedAnswersModels = getUpdatedAnswersModels(
			(await Answer.scan()).Items,
			formattedUpdatedAnswers
		);

		await Promise.all(updatedRnasModels, updatedAnswersModels);

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': process.env.CORS
			}
		};
	} catch (error) {
		console.error(error);

		return {
			statusCode: 500,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': process.env.CORS
			},
			body: JSON.stringify({ message: 'Internal Server Error' }),
		};
	}
};
