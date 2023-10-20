export const convertAnswerToDto = answer => ({
  id: answer.id,
  questionId: answer.questionId,
  value: answer.value,
  photos: answer.photos,
  notes: answer.notes,
  rnaId: answer.rnaId,
  lastUpdatedOn: answer.lastUpdatedOn,
  createdOn: answer.createdOn,
});