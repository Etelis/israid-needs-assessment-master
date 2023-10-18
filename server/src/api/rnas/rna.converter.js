export const convertRnaToDto = rna => ({
  id: rna._id,
  isCompleted: rna.isCompleted,
  communityName: rna.communityName,
  communityType: rna.communityType,
  lastUpdateDate: rna.lastUpdateDate,
  creationDate: rna.creationDate,
  location: rna.location
});