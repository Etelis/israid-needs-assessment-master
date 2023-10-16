import { Navigate, useRoutes } from 'react-router-dom';
import CategoriesQuestionsRoutes from './CategoriesQuestionsRoutes';
import useRnasQuery from '../utils/online/useRnasQuery';
import useAnswersQuery from '../utils/online/useAnswersQuery';
import { AddRNA, RNAs } from './RNAs';

const Routes = () => {
	//TODO: if internet => call hook to pull all data from the db here, the hook should have a set time
	//TODO: for example every 15 min if interent is present sync with the db
	//TODO: if fetching data show loading spinner => throughout the app we assume we always have the data
	//TODO: TEMP:
	const { data: rnas = [] } = useRnasQuery();
	useAnswersQuery(rnas);

	return useRoutes([
		{
			index: true,
			element: <Navigate to='/RNAs' replace />,
		},
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
	]);
};

export default Routes;
