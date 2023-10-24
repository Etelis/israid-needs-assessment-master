import { useRoutes } from 'react-router';
import QuestionPage from './pages/Categories/questions/QuestionPage';
import { CategoriesProvider } from './pages/Categories/context/useCategoriesContext';
import CategoriesList from './pages/Categories/CategoriesList';

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
