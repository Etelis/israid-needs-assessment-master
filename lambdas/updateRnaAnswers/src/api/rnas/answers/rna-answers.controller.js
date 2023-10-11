import { Answer } from '../../../models';
import { convertAnswerToDto } from './rna-answers.converter';

export const getRnaAnswers = (req, res, next) => {
  const {rnaId} = req.params;

  Answer.find({rnaId})
    .then((answers) => answers.map(convertAnswerToDto))
    .then(dtos => {
      res.send(dtos);
    })
    .catch(next);
}

const hasAnswerChanged = (oldAnswer, newAnswer) => {
  if (!newAnswer) {
    return false;
  }

  return newAnswer.value !== oldAnswer.value || JSON.stringify(newAnswer.photos) !== JSON.stringify(oldAnswer.photos) || newAnswer.notes !== oldAnswer.notes;
}

export const updateRnaAnswers = (req, res, next) => {
  const {rnaId} = req.params;
  const {answers: newAnswers} = req.body;

  Answer.find({rnaId})
    .then(async oldAnswers => {
      const answers = newAnswers.map(newAnswer => {
        const oldAnswer = oldAnswers.find(x => x.questionId === newAnswer.questionId);

        if (!oldAnswer) {
          return new Answer({...newAnswer, rnaId});
        }

        if (!hasAnswerChanged(oldAnswer, newAnswer)) {
          return null;
        }

        oldAnswer.value = newAnswer.value;
        oldAnswer.photos = newAnswer.photos;
        oldAnswer.notes = newAnswer.notes;

        return oldAnswer;
      });

      await Promise.all(answers.filter(x => x).map(x => x.save()));
    })
    .then(() => res.sendStatus(200))
    .catch(next);
}