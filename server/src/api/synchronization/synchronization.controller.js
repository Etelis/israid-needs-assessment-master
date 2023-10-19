import { RNA, Answer } from '../../models';
import { getUpdatedAnswersModels } from '../rnas/answers/rna-answers.controller';
import { getUpdatedRnasModels } from '../rnas/rnas.controller';

export const synchronize = async (req, res, next) => {
	try {
		const { updatedRnas, updatedAnswers } = req.body;

		const updatedRnasModels = getUpdatedRnasModels(
			await RNA.find(),
			updatedRnas
		).map((x) => x.save());

		const updatedAnswersModels = getUpdatedAnswersModels(
			await Answer.find(),
			updatedAnswers
		).map((x) => x.save());

		await Promise.all(updatedRnasModels, updatedAnswersModels);

		res.send(200);
	} catch (error) {
		next();
	}
};