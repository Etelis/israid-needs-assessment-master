import LinearProgress, {
	linearProgressClasses,
} from '@mui/material/LinearProgress';

const ProgressBar = ({ totalQuestions, answeredQusetion }) => {
	return (
		<LinearProgress
			sx={{
				height: 10,
				borderRadius: 5,
				[`&.${linearProgressClasses.colorPrimary}`]: {
					backgroundColor: (theme) =>
						theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
				},
				[`& .${linearProgressClasses.bar}`]: {
					borderRadius: 5,
					backgroundColor: (theme) =>
						theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
				},
			}}
			variant='determinate'
			value={(answeredQusetion / totalQuestions) * 100}
		/>
	);
};

export default ProgressBar;
