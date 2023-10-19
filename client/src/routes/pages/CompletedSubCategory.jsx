import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgressLabel } from '../../components/CircularProgressLabel/CircularProgressLabel';
import subCategories from '../../static-data/sub-categories.json';

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
		<Stack spacing={4} alignItems='center' m={2}>
			<Typography variant='h4' textAlign='center'>
				<b>{subCategory.name}</b>
			</Typography>
			<CircularProgressLabel
				value={100}
				size={200}
				fontSize='xx-large'
				sx={(theme) => ({ color: theme.colors.utility })}
			/>
			<Typography variant='subtitle2' sx={{ textAlign: 'center' }}>
				Based on your previous answers, we were able to skip a few
				questions
			</Typography>
			<Typography variant='caption' sx={{ textAlign: 'center' }}>
				you can still see them if you go back to caterogy and select
				"view all questions"
			</Typography>
			<Stack spacing={2}>
				<Button
					variant='contained'
					endIcon={<EastOutlinedIcon />}
					disabled={!nextSubCategory}
					onClick={() =>
						navigate(
							`/RNAs/${rnaId}/${categoryId}/${nextSubCategory.id}`
						)
					}
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