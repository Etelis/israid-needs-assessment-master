import { Stack } from '@mui/material';
import AnswerButton from './AnswerButton';

const YesNoAnswer = ({ answer, setAnswer }) => {
  return (
    <Stack direction='row' justifyContent='space-around' padding='20px'>
      <AnswerButton
        answer='No'
        isSelected={answer === false}
        selectedColor='#A81313A8'
        onClick={() => setAnswer(false)}
      />
      <AnswerButton
        answer='Yes'
        isSelected={answer}
        selectedColor='#13A813A8'
        onClick={() => setAnswer(true)}
      />
    </Stack>
  );
};

export default YesNoAnswer;
