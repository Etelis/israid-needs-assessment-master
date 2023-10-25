import { Answer } from '../../../models';
import { convertAnswerToDto } from './rna-answers.converter';

export const getRnaAnswers = (req, res, next) => {
	const { rnaId } = req.params;

	Answer.find({ rnaId })
		.then((answers) => answers.map(convertAnswerToDto))
		.then((dtos) => {
			res.send(dtos);
		})
		.catch(next);
};

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

export const getUpdatedAnswersModels = (oldAnswers, newAnswers) =>
	newAnswers
		.map((newAnswer) => {
			const oldAnswer = oldAnswers.find(
				(x) =>
					x.rnaId === newAnswer.rnaId &&
					x.questionId === newAnswer.questionId
			);

			if (!oldAnswer) {
				return new Answer(newAnswer);
			}

			if (
				!hasAnswerChanged(oldAnswer, newAnswer) ||
				new Date(oldAnswer.createdOn) > new Date(newAnswer.createdOn)
			) {
				return null;
			}

			oldAnswer.value = newAnswer.value;
			oldAnswer.photos = newAnswer.photos;
			oldAnswer.notes = newAnswer.notes;

			return oldAnswer;
		})
		.filter((x) => x);

// export const updateRnaAnswers = (req, res, next) => {
// 	const { rnaId } = req.params;
// 	const newAnswers = req.body;

// 	Answer.find({ rnaId })
// 		.then(async (oldAnswers) => {
// 			const answers = getUpdatedAnswersModels(oldAnswers, newAnswers);

// 			await Promise.all(answers.filter((x) => x).map((x) => x.save()));
// 		})
// 		.then(() => res.sendStatus(200))
// 		.catch(next);
// };
