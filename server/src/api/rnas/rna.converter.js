export const convertRnaToDto = rna => ({
  id: rna.id,
  isCompleted: rna.isCompleted,
  communityName: rna.communityName,
  communityType: rna.communityType,
  lastUpdatedOn: rna.lastUpdatedOn,
  createdOn: rna.createdOn,
  location: rna.location
});