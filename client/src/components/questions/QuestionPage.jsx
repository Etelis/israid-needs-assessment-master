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
import styles from './styles';

const isAnswerAsExpected = (answer, question) => {
  const expectedAnswer = question.dependencies.expectedAnswer;

  if (Array.isArray(answer.value)) {
    return answer.value.includes(expectedAnswer);
  }

  return answer.value === expectedAnswer;
};

const isQuestionReduntent = (question, rnaAnswers) =>
  !question.dependencies || (
    rnaAnswers[question.dependencies.questionId] &&
    isAnswerAsExpected(rnaAnswers[question.dependencies.questionId], question)
  );

const QuestionPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attachedPhotos, setAttachedPhotos] = useState([]);
  const [notes, setNotes] = useState();

  const [rnaAnswers, setRnaAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  const subCategoryId = useParams().subCategoryId;
  const rnaId = useParams().rnaId;

  const subCategoryQuestions = questions.filter(x => x.subCategoryId === subCategoryId);
  const viewQuestions = subCategoryQuestions.filter(x => isQuestionReduntent(x, rnaAnswers));

  useEffect(() => {
    get(rnaId)
      .then(currentRnaAnswers => {
        if (!currentRnaAnswers) {
          return;
        }

        setRnaAnswers(currentRnaAnswers);
      }).finally(() => setIsLoading(false))
  }, []);

  if (isLoading) {
    return null;
  }

  if (currentQuestionIndex >= viewQuestions.length) {
    return <CompletedSubCategory/>;
  }

  const currentQuestion = viewQuestions[currentQuestionIndex];
  const currentAnswer = rnaAnswers[currentQuestion.id] ?? {};

  const setCurrentAnswer = value => {
    setRnaAnswers(oldAnswers => ({
      ...oldAnswers,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        value,
        photos: attachedPhotos.map(x => x.data),
        notes: notes
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
    await set(rnaId, rnaAnswers);
    
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
          sx={styles.notesBox}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
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

export default QuestionPage;