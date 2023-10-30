import { Box, Typography } from '@mui/material';
import styles from './styles';

const Question = ({ question }) => (
	<Box sx={styles.questionBox}>
		<Typography fontSize='32px' fontWeight='bold'>
			{question}
		</Typography>
	</Box>
);

export default Question;
