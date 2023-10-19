import { useRoutes } from 'react-router';
import QuestionPage from '../components/questions/QuestionPage';
import { CategoriesProvider } from '../context/useCategoriesContext';
import CategoriesList from './pages/CategoriesList';

const CategoriesQuestionsRoutes = () => {
	const CategoriesRoutes = useRoutes([
		{
			index: true,
			element: <CategoriesList />,
		},
		{
			path: ':categoryId/:subCategoryId',
			element: <QuestionPage />,
		},
	]);

	return <CategoriesProvider>{CategoriesRoutes}</CategoriesProvider>;
};

export default CategoriesQuestionsRoutes;