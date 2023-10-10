import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgressLabel } from '../components/CircularProgressLabel/CircularProgressLabel';
import subCategories from '../static-data/sub-categories.json';

const CompletedSubCategory = () => {
  const rnaId = useParams().rnaId;
  const categoryId = useParams().categoryId;
  const subCategoryId = useParams().subCategoryId;

  const navigate = useNavigate()
  const categorySubCategories = subCategories.filter(x => x.categoryId === categoryId);
  const subCategoryIndex = categorySubCategories.findIndex(x => x.id === subCategoryId);
  const subCategory = categorySubCategories[subCategoryIndex];
  const nextSubCategory = categorySubCategories[subCategoryIndex + 1];

  return (
    <Stack spacing={2} alignItems='center' m={2}>
      <Typography variant='h6'>{subCategory.name}</Typography>
      <CircularProgressLabel value={100} size={150} fontSize='xx-large'/>
      <Typography variant='subtitle2' sx={{textAlign: 'center'}}>
        Based on your previous answers, we were
        able to skip a few questions
      </Typography>
      <Typography variant='caption' sx={{textAlign: 'center'}}>
        you can still see them if you go back to caterogy
        and select "view all questions"
      </Typography>
        <Button variant="contained" endIcon={<EastOutlinedIcon />}
        disabled={!nextSubCategory}
        onClick={() => navigate(nextSubCategory ? `/RNAs/${rnaId}/${categoryId}/${nextSubCategory.id}` : `/RNAs/${rnaId}/review`)}>
          {nextSubCategory ? 'Next Sub Category' : 'Review'}
        </Button>
        <Button variant="outlined" startIcon={<WidgetsOutlinedIcon />}
        onClick={() => navigate(`/RNAs/${rnaId}`)}>
          Show all categories
        </Button>
    </Stack>
  )
}

export default CompletedSubCategory;