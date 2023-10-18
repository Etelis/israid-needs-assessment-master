export const convertAnswerToDto = answer => ({
  id: answer._id,
  questionId: answer.questionId,
  value: answer.value,
  photos: answer.photos,
  notes: answer.notes,
  lastUpdateDate: answer.lastUpdateDate,
  creationDate: answer.creationDate,
});