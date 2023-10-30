import { Stack, Typography } from '@mui/material';
import ProgressBar from './ProgressBar';

const ProgressSummary = ({ ProgressDetails, currentProgress, maxProgress }) => (
	<Stack direction='row' alignItems='center' flexGrow={1} spacing={2}>
		<Stack flexGrow={1}>
			{ProgressDetails}
			<ProgressBar
				answeredQusetion={currentProgress}
				totalQuestions={maxProgress}
			/>
		</Stack>
		<Typography
			variant='button'
			sx={{ color: '#2AA63C', fontSize: '22px' }}
		>
			{currentProgress}/{maxProgress}
		</Typography>
	</Stack>
);

export default ProgressSummary;
