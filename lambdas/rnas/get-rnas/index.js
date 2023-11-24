const { RNA } = require('/opt/schema-layer/rna-schema.js');
const {
	getSuccessResponse,
	getErrorResponse,
} = require('/opt/utils/http-objects.js');

const formatRna = (rna) => ({
	id: rna.id,
	affectedHouseholds: rna.affectedHouseholds,
	communityName: rna.communityName,
	communityType: rna.communityType,
	createdOn: rna.createdOn,
	creatorMail: rna.creatorMail,
	creatorName: rna.creatorName,
	emergencies: rna.emergencies ? rna.emergencies : [],
	isCompleted: rna.isCompleted,
	location: rna.location ? rna.location : '',
});

exports.handler = async () => {
	try {
		const { Items: rnas } = await RNA.scan();

		const formattedRnas = rnas.map(formatRna);

		return getSuccessResponse(formattedRnas);
	} catch (error) {
		console.error(error);

		return getErrorResponse();
	}
};
