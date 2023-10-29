import LinearProgress, {
	linearProgressClasses,
} from '@mui/material/LinearProgress';

const ProgressBar = ({ totalQuestions, answeredQusetion }) => {
	return (
		<LinearProgress
			sx={{
				height: 13,
				borderRadius: '8px',
				width: '100%',
				[`&.${linearProgressClasses.colorPrimary}`]: {
					backgroundColor: (theme) => theme.palette.grey[200],
				},
				[`& .${linearProgressClasses.bar}`]: {
					borderRadius: 5,
					backgroundColor: (theme) => theme.colors.utility,
				},
			}}
			variant='determinate'
			value={(answeredQusetion / totalQuestions) * 100}
		/>
	);
};

export default ProgressBar;
