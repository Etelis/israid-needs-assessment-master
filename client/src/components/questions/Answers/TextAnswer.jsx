import { TextField } from '@mui/material';

const TextAnswer = ({ answer, setAnswer }) => (
  <TextField
  value={answer}
    fullWidth
    multiline
    rows='4'
    sx={{ padding: 2 }}
    placeholder={'Enter your answer here...'}
    onChange={(e) => setAnswer(e.target.value)}
  />
);

export default TextAnswer;
