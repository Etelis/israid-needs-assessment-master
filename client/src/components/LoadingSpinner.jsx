import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = () => {
	return (
		<Box
			display='flex'
			height='80vh'
			justifyContent='center'
			alignItems='center'
		>
			<CircularProgress
				sx={(theme) => ({ color: theme.colors.utility })}
				size={150}
				thickness={2}
			/>
		</Box>
	);
};

export default LoadingSpinner;