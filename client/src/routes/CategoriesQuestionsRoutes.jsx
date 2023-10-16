import { Route, Routes } from 'react-router';
import QuestionPage from '../components/questions/QuestionPage';
import { CategoriesProvider } from '../context/useCategoriesContext';
import CategoriesList from './CategoriesList';

const CategoriesQuestionsRoutes = () => (
	<CategoriesProvider>
		<Routes>
			<Route index element={<CategoriesList />} />
			<Route
				path=':categoryId/:subCategoryId'
				element={<QuestionPage />}
			/>
		</Routes>
	</CategoriesProvider>
);

export default CategoriesQuestionsRoutes;