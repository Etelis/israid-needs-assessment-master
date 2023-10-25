import { Button } from '@mui/material';
import styles from './styles';

const AnswerButton = ({ isSelected, onClick, answer, selectedColor }) => (
	<Button
		size='large'
		sx={(theme) => styles.answerButton(theme, isSelected, selectedColor)}
		onClick={onClick}
	>
		{answer}
	</Button>
);

export default AnswerButton;
