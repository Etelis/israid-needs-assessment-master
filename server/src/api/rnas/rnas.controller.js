import { RNA } from '../../models';
import { convertRnaToDto } from './rna.converter';

const hasRnaChanged = (oldRna, newRna) => {
	if (!newRna) {
		return false;
	}

	return (
		newRna.communityName !== oldRna.communityName ||
		newRna.location !== oldRna.location ||
		newRna.isCompleted !== oldRna.isCompleted ||
		newRna.communityType !== oldRna.communityType
	);
};

export const getUpdatedRnasModels = (oldRnas, newRnas) =>
	newRnas
		.map((newRna) => {
			const oldRna = oldRnas.find((x) => x.id === newRna.id);

			if (!oldRna) {
				return new RNA(newRna);
			}

			if (!hasRnaChanged(oldRna, newRna)) {
				return null;
			}

			oldRna.communityName = newRna.communityName;
			oldRna.communityType = newRna.communityType;
			oldRna.location = newRna.location;
			oldRna.isCompleted = newRna.isCompleted;

			return oldRna;
		})
		.filter((x) => x);

export const createRna = (req, res, next) => {
	const { communityName, communityType, location } = req.body;

	const rna = new RNA({
		communityName,
		communityType,
		location,
	});

	rna.save()
		.then(convertRnaToDto)
		.then((dto) => {
			res.send(dto);
		})
		.catch(next);
};

export const getRNAs = async (req, res, next) => {
	const rnas = (await RNA.find()).map(convertRnaToDto);

	res.send(rnas);
};