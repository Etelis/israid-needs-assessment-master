import { Box } from '@mui/material';

const Question = ({ question }) => (
  <Box
    sx={{
      margin: '15px 8px',
      textAlign: 'center',
      borderRadius: '5px',
      border: '1px solid gray',
    }}
  >
    {question}
  </Box>
);

export default Question;
