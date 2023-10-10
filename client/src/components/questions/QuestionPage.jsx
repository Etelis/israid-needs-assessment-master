import { Box, TextField } from '@mui/material';
import { get, set } from 'idb-keyval';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CompletedSubCategory from '../../routes/CompletedSubCategory';
import questions from '../../static-data/questions.json';
import AnswerInput from './Answers/AnswerInput';
import PhotoManager from './Answers/PhotoManager';
import Controls from './Controls/Controls';
import Question from './Question';

const isAnswerAsExpected = (answer, question) => {
  const expectedAnswer = question.dependencies.expectedAnswer;

  if (Array.isArray(answer.value)) {
    return answer.value.includes(expectedAnswer);
  }

  return answer.value === expectedAnswer;
}

const isQuestionRelevant = (question, answersByQuestionId) =>
  !question.dependencies || (
    answersByQuestionId[question.dependencies.questionId] &&
    isAnswerAsExpected(answersByQuestionId[question.dependencies.questionId], question)
  );

export const QuestionPage = () => {
  const subCategoryId = useParams().subCategoryId;
  const rnaId = useParams().rnaId;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attachedPhotos, setAttachedPhotos] = useState([]);
  const [additionalDetails, setAdditionalDetails] = useState();

  const [rnaAnswersByQuestionId, setRnaAnswersByQuestionId] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const subCategoryQuestions = questions.filter(x => x.subCategoryId === subCategoryId);
  const viewQuestions = subCategoryQuestions.filter(x => isQuestionRelevant(x, rnaAnswersByQuestionId));

  useEffect(() => {
    get(rnaId)
      .then(rnaAnswers => {
        if (!rnaAnswers) {
          return;
        }

        setRnaAnswersByQuestionId(rnaAnswers);
      }).finally(() => setIsLoading(false))
  }, []);

  if (isLoading) {
    return null;
  }

  if (currentQuestionIndex >= viewQuestions.length) {
    return <CompletedSubCategory/>;
  }

  const currentQuestion = viewQuestions[currentQuestionIndex];
  const currentAnswer = rnaAnswersByQuestionId[currentQuestion.id] ?? {};

  const setCurrentAnswer = (value) => {
    console.log(value);
    setRnaAnswersByQuestionId(oldAnswers => ({
      ...oldAnswers,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        value,
        photos: attachedPhotos.map(x => x.data),
        notes: additionalDetails
      }
    }));
  }
  
  const skip = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  const prev = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  }

  const persistAnswers = async () => {
    await set(rnaId, rnaAnswersByQuestionId);
    
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    persistAnswers();
  };

  return (
    <Box>
      <Question question={currentQuestion.title} />
      <form onSubmit={handleSubmit}>
        <AnswerInput
          question={currentQuestion}
          answer={currentAnswer.value}
          setAnswer={setCurrentAnswer}
        />

        <PhotoManager
          attachedPhotos={attachedPhotos}
          setAttachedPhotos={setAttachedPhotos}
        />

        <TextField
          label='Additional Notes...'
          fullWidth
          multiline
          rows='2'
          sx={{
            padding: 2,
            '& label': {
              py: 2,
              px: '21px',
            },
          }}
          value={additionalDetails}
          onChange={(e) => setAdditionalDetails(e.target.value)}
        />

        <Controls
          onPrev={prev}
          canGoPrev={currentQuestionIndex !== 0}
          canGoNext={currentAnswer.value != null}
          onSkip={skip}
        />
      </form>
    </Box>
  );
};
