import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { NavLink } from 'react-router-dom';
import { useBreadcrumbsContext } from './context/useBreadcrumbsContext';

const BreadcrumbsTrail = () => {
	const { breadcrumbs } = useBreadcrumbsContext();

	return (
		<Box ml={2} mt={1}>
			<Breadcrumbs
				separator={<NavigateNextIcon />}
				aria-label='breadcrumb'
			>
				{breadcrumbs.map((crumb, index) =>
					index + 1 !== breadcrumbs.length ? (
						<NavLink
							key={crumb.text}
							style={{ color: '#858C95', textDecoration: 'none' }}
							to={crumb.routeTo}
						>
							{crumb.text}
						</NavLink>
					) : (
						<Typography key={crumb.text} color={blue[500]}>
							{crumb.text}
						</Typography>
					)
				)}
			</Breadcrumbs>
		</Box>
	);
};

export default BreadcrumbsTrail;
