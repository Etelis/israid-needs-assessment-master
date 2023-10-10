import { Card, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';

const SubQuestionCategory = ({ id, categoryId, title, totalQuestions, answeredQusetion }) => {
  const navigate = useNavigate();

  const navigateToQuestions = () => {
    navigate(`${categoryId}/${id}`);
  }

  return (
    <Card onClick={navigateToQuestions} style={{ display: 'flex', flexDirection: 'row', padding: '8px', margin: '8px', alignItems: "center", justifyContent: "space-around" }}>
        <Stack sx={{ width: '60%' }}>
            <Typography variant="body2" fontWeight="bold">{title}</Typography>
            <ProgressBar answeredQusetion={answeredQusetion} totalQuestions={totalQuestions} />
        </Stack>
        <Typography variant="button" sx={{ color: '#2AA63C' }}>{answeredQusetion}/{totalQuestions}</Typography>
    </Card>
  )
}

export default SubQuestionCategory;