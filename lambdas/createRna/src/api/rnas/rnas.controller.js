import { RNA } from '../../models';
import { convertRnaToDto } from './rna.converter';

export const createRna = (req, res, next) => {
  const { communityName, communityType, location } = req.body;

  const rna = new RNA({
    communityName,
    communityType,
    location
  });

  rna.save()
    .then(convertRnaToDto)
    .then(dto => {
      res.send(dto);
    })
    .catch(next);
}

export const getRNAs = async (req, res, next) => {
  const rnas = await RNA.find();
  const formattedRnas = rnas.map(({ _doc: rna }) => {
    const { _id: id, ...rest } = rna

    return ({ id, ...rest });
  })

  res.send(formattedRnas);
}