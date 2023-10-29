import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgressLabel } from '../../../components/CircularProgressLabel/CircularProgressLabel';
import subCategories from '../../../static-data/sub-categories.json';
import styles from './styles';

const CompletedSubCategory = () => {
	const { rnaId, categoryId, subCategoryId } = useParams();
	const navigate = useNavigate();

	const currentCategorySubCategories = subCategories.filter(
		(x) => x.categoryId === categoryId
	);
	const curentSubCategoryIndex = currentCategorySubCategories.findIndex(
		(x) => x.id === subCategoryId
	);
	const subCategory = currentCategorySubCategories[curentSubCategoryIndex];
	const nextSubCategory =
		currentCategorySubCategories[curentSubCategoryIndex + 1];

	return (
		<Stack
			height='90vh'
			spacing={2}
			alignItems='center'
			justifyContent='space-around'
		>
			<Stack spacing={6} alignItems='center'>
				<Typography
					variant='h4'
					textAlign='center'
					fontSize='48px'
					fontWeight='bold'
				>
					{subCategory.name} - Completed
				</Typography>
				<CircularProgressLabel
					value={100}
					size={250}
					fontSize='xx-large'
					sx={(theme) => ({ color: theme.colors.utility })}
				/>
			</Stack>
			<Typography variant='h4' fontWeight='bold' textAlign='center'>
				Good job! You have completed this section.
			</Typography>
			<Stack width='80%' spacing={2}>
				<Button
					fullWidth
					disabled={!nextSubCategory}
					endIcon={<EastOutlinedIcon />}
					onClick={() =>
						navigate(
							`/RNAs/${rnaId}/${categoryId}/${nextSubCategory.id}`
						)
					}
					sx={(theme) => styles.nextButton(theme)}
				>
					{nextSubCategory ? 'Next Sub Category' : 'All Done'}
				</Button>
				<Button
					variant='outlined'
					startIcon={<WidgetsOutlinedIcon />}
					onClick={() => navigate(`/RNAs/${rnaId}`)}
				>
					Show all categories
				</Button>
			</Stack>
		</Stack>
	);
};

export default CompletedSubCategory;
