import { Box } from '@mui/material';
import styles from './styles';

const Question = ({ question }) => (
  <Box sx={styles.questionBox}>{question}</Box>
);

export default Question;
