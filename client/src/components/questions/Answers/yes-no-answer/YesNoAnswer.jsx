import { Stack } from '@mui/material';
import AnswerButton from './AnswerButton';

const YesNoAnswer = ({ answer, setAnswer }) => {
  return (
    <Stack direction='row' justifyContent='space-around' padding='20px'>
      <AnswerButton
        answer='No'
        isSelected={answer === false}
        onClick={() => setAnswer(false)}
      />
      <AnswerButton
        answer='Yes'
        isSelected={answer}
        onClick={() => setAnswer(true)}
      />
    </Stack>
  );
};

export default YesNoAnswer;
