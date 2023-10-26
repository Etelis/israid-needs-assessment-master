const { RNA } = require("/opt/schema-layer/rna-schema.js");
const { Answer } = require("/opt/schema-layer/answer-schema.js");

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

      oldRna.communityName = newRna.communityName;
      oldRna.communityType = newRna.communityType;
      oldRna.location = newRna.location;
      oldRna.affectedHouseholds = newRna.affectedHouseholds;
      oldRna.lastUpdatedOn = new Date().toISOString();
      oldRna.isCompleted = newRna.isCompleted;

      return RNA.update({ PK: oldRna.id }, { ...oldRna });
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
          x.rnaId === newAnswer.rnaId && x.questionId === newAnswer.questionId
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

      return Answer.update({ PK: oldAnswer.id }, { ...newAnswer });
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

	formattedUpdatedAnswers = updatedAnswers
	formattedUpdatedRnas = updatedRnas


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
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
