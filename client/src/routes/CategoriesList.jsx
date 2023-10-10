import { Box } from '@mui/material';
import ProgressOverview from '../components/ProgressOverview';
import QuestionCategory from '../components/QuestionCategory';

import categories from '../static-data/categories.json';
import questions from '../static-data/questions.json';
import subCategories from '../static-data/sub-categories.json';

const getQuestionAmountForSubCategory = (subCategoryId) => questions.reduce((amount, question) => question.subCategoryId === subCategoryId ? amount + 1 : amount, 0);

const useViewCategories = () => {
  const viewSubCategories = subCategories.map(x => {
    return {
      ...x,
      totalQuestionAmount: getQuestionAmountForSubCategory(x.id),
      answeredQuestionAmount: 0
    }
  })

  return categories.map(x => {
    const categorySubCategories = viewSubCategories.filter(y => x.id === y.categoryId);

    return {
      ...x,
      subCategories: categorySubCategories,
      totalQuestionAmount: categorySubCategories.reduce((amount, x) => amount + x.totalQuestionAmount, 0),
      answeredQuestionAmount: categorySubCategories.reduce((amount, x) => amount + x.answeredQuestionAmount, 0)
    }
  })
}

const CategoriesList = () => {
  const viewCategories = useViewCategories();

  return (
    <Box>
      <ProgressOverview leftColumnAmount={65} leftColumnCaption={"Form Completed"} rightColumnAmount={1080} rightColumnCaption={"Questions Answered"} />
      {viewCategories?.map((x, index) => (
        <QuestionCategory key={index} title={x.name} preview={x.description} id={x.id}
          iconSrc={x.iconSrc} totalQuestions={x.totalQuestionAmount} answeredQusetion={x.answeredQuestionAmount} subCategories={x.subCategories}>
        </QuestionCategory>
      ))}
    </Box>
  )
}

export default CategoriesList;