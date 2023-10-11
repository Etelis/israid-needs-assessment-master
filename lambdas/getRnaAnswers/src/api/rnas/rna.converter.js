export const convertRnaToDto = rna => ({
  id: rna.permanentId,
  status: rna.status,
  communityName: rna.communityName,
  communityType: rna.communityType,
  lastUpdateDate: rna.lastUpdateDate,
  creationDate: rna.creationDate,
  location: rna.location
});