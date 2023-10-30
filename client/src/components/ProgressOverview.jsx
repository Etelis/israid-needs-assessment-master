import { Stack, Typography, Divider } from '@mui/material/';

const ProgressOverview = ({
	leftColumnAmount,
	leftColumnCaption,
	rightColumnAmount,
	rightColumnCaption,
	isLeftColumnInPercentage = true,
}) => (
	<Stack alignItems='center' spacing={0.2} py={1}>
		<Typography variant='h6'>RNA Progress Overview</Typography>
		<Stack direction='row' spacing={2}>
			<Stack alignItems='center'>
				<Typography variant='h3' fontSize='36px'>
					{leftColumnAmount}
					{isLeftColumnInPercentage ? '%' : ''}
				</Typography>
				<Typography sx={{ color: 'Grey' }} variant='caption'>
					{leftColumnCaption}
				</Typography>
			</Stack>
			<Divider orientation='vertical' flexItem />
			<Stack alignItems='center'>
				<Typography variant='h3' fontSize='36px'>
					{rightColumnAmount}
				</Typography>
				<Typography sx={{ color: 'Grey' }} variant='caption'>
					{rightColumnCaption}
				</Typography>
			</Stack>
		</Stack>
	</Stack>
);

export default ProgressOverview;
