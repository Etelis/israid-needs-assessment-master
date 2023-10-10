import { Accordion, AccordionDetails, AccordionSummary, Avatar, Card, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import ProgressBar from './ProgressBar';
import SubQuestionCategory from './SubQuestionCategory';

const QuestionCategory = ({ id, title, preview, totalQuestions, answeredQusetion, subCategories, iconSrc }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card sx={{ margin: '6px' }}>
      <Accordion expanded={isExpanded} onChange={toggleExpand}>
        <AccordionSummary>
          <Stack padding="6px" direction='row' alignItems='center' width="100%" justifyContent="space-between" spacing={4}>
            <Stack direction='row' alignItems='center' spacing={1} >
              <Avatar alt="John Doe" src={iconSrc} />
              <Stack>
                <Typography variant="h6">{title}</Typography>
                <Typography sx={{ color: 'Grey' }} variant='caption'>{preview}</Typography>
                <ProgressBar answeredQusetion={answeredQusetion} totalQuestions={totalQuestions} />
              </Stack>
            </Stack>
            <Typography variant="button" sx={{ color: '#2AA63C' }}>{answeredQusetion}/{totalQuestions}</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          {subCategories.map((x) => (
            <SubQuestionCategory title={x.name} answeredQusetion={x.answeredQuestionAmount} categoryId={id} id={x.id}
            totalQuestions={x.totalQuestionAmount} key={x.id}></SubQuestionCategory>
            ))}
        </AccordionDetails>
      </Accordion>
    </Card>
  )
}

export default QuestionCategory;