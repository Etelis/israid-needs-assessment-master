import { Box, Typography } from '@mui/material';
import styles from './styles';

const Question = ({ question }) => (
	<Box sx={styles.questionBox}>
		<Typography variant='h4' fontWeight='bold' sx={{}}>{question}</Typography>
	</Box>
);

export default Question;
