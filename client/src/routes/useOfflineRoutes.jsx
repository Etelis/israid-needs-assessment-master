import { Navigate } from 'react-router-dom';
import CategoriesQuestionsRoutes from './CategoriesQuestionsRoutes';
import { AddRNA, RNAs } from './pages/RNAs';

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
		path: '*',
		index: true,
		element: <Navigate to='/RNAs' replace />,
	},
];

export default useOfflineRoutes;