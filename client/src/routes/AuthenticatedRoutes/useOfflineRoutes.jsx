import { Navigate } from 'react-router-dom';
import CategoriesQuestionsRoutes from './CategoriesQuestionsRoutes';
import { AddRNA, RNAs } from '../pages/RNAs';
import { UpdatePersonalDetails } from '../pages/UpdatePersonalDetails';

const useOfflineRoutes = () => [
	{
		path: 'RNAs',
		element: <RNAs />,
	},
	{
		path: 'RNAs/add',
		element: <AddRNA />,
	},
	{
		path: 'RNAs/:rnaId/*',
		element: <CategoriesQuestionsRoutes />,
	},
	{
		path: 'update-personal-details',
		element: <UpdatePersonalDetails />,
	},
	{
		path: '*',
		index: true,
		element: <Navigate to='/RNAs' replace />,
	},
];

export default useOfflineRoutes;