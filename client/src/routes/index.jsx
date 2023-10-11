import { Navigate, useRoutes } from 'react-router-dom';
import { QuestionPage } from '../components/questions/QuestionPage';
import AddRNA from './AddRNA';
import CategoriesList from './CategoriesList';
import { RNAs } from './RNAs';

const Routes = () => {
  return useRoutes([
    {
      index: true,
      element: <Navigate to="/RNAs" replace />,
    },
    {
      path: 'RNAs',
      element: <RNAs />
    },
    {
      path: 'Rnas/:rnaId/:categoryId/:subCategoryId',
      element: <QuestionPage/>
    },
    {
      path: 'RNAs/add',
      element: <AddRNA />,
    },
    {
      path: 'RNAs/:id',
      element: <CategoriesList />
    }
  ]);
};

export default Routes;
