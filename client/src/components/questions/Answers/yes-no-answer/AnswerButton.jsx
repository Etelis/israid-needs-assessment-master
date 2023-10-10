import { Button } from '@mui/material';
import styles from './styles';

const AnswerButton = ({ isSelected, onClick, answer }) => (
  <Button
    size='large'
    sx={(theme) => styles.answerButton(theme, isSelected)}
    onClick={onClick}
  >
    {answer}
  </Button>
);

export default AnswerButton;
