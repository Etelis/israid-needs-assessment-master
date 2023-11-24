import { api } from '../axios';

const getRnaExcel = (rnaId) =>
	api.get(`/exportExcel`, { data: { RNA_id: rnaId } });

export default getRnaExcel;
