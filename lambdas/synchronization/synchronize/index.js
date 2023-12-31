const { RNA } = require('/opt/schema-layer/rna-schema.js');
const { Answer } = require('/opt/schema-layer/answer-schema.js');
const {
	getSuccessResponse,
	getErrorResponse,
} = require('/opt/utils/http-objects.js');

const areArraysEqual = (arr1, arr2) => {
	if (arr1.length !== arr2.length) {
		return false;
	}

	const sortedArr1 = arr1.slice().sort();
	const sortedArr2 = arr2.slice().sort();

	for (let i = 0; i < sortedArr1.length; i++) {
		if (sortedArr1[i] !== sortedArr2[i]) {
			return false;
		}
	}

	return true;
};

const hasRnaChanged = (oldRna, newRna) => {
	if (!newRna) {
		return false;
	}

	return (
		newRna.communityName !== oldRna.communityName ||
		newRna.location !== oldRna.location ||
		newRna.isCompleted !== oldRna.isCompleted ||
		newRna.communityType !== oldRna.communityType ||
		!areArraysEqual(newRna.emergencies, oldRna.emergencies) ||
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
				emergencies,
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
				emergencies,
			});
		})
		.filter((x) => x);

const hasAnswerChanged = (oldAnswer, newAnswer) => {
	if (!newAnswer) {
		return false;
	}

	return (
		JSON.stringify(newAnswer.value) !== JSON.stringify(oldAnswer.value) ||
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
		.filter((x) => x !== null);

const formatAnswer = (answer) => ({
	value: {
		storedValue: answer.value,
	},
	questionId: answer.questionId,
	rnaId: answer.rnaId,
	notes: answer.notes ? answer.notes : '',
	photos: answer.photos ? answer.photos : [],
	createdOn: answer.createdOn,
});

const formatRna = (rna) => ({
	id: rna.id,
	communityName: rna.communityName,
	communityType: rna.communityType,
	location: rna.location ? rna.location : '',
	affectedHouseholds: rna.affectedHouseholds,
	emergencies: rna.emergencies ? rna.emergencies : [],
	createdOn: rna.createdOn,
	creatorMail: rna.creatorMail,
	creatorName: rna.creatorName,
	isCompleted: rna.isCompleted,
});

exports.handler = async (event) => {
	try {
		const { updatedRnas, updatedAnswers } = JSON.parse(event.body);

		const formattedRnas = updatedRnas.map(formatRna);

		const updatedRnasModels = getUpdatedRnasModels(
			(await RNA.scan()).Items,
			formattedRnas
		);

		const formattedAnswers = updatedAnswers.map(formatAnswer);

		const updatedAnswersModels = getUpdatedAnswersModels(
			(await Answer.scan()).Items,
			formattedAnswers
		);

		await Promise.all([...updatedRnasModels, ...updatedAnswersModels]);

		return getSuccessResponse();
	} catch (error) {
		console.error(error);

		return getErrorResponse();
	}
};
