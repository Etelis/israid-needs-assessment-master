import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const ContinueButton = ({ children, link, sx = {}, ...props }) => {
	const behaviorProps = link ? { component: Link, to: link } : {};

	return (
		<Button
			{...behaviorProps}
			variant='contained'
			sx={{ py: 2, px: 4, ...sx }}
			startIcon={<CheckBoxOutlinedIcon fontSize='large' />}
			endIcon={<ArrowForwardOutlinedIcon />}
			{...props}
		>
			{children}
		</Button>
	);
};
