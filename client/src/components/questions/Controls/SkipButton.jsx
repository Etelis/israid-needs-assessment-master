import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './styles';

const SkipButton = ({ children, link, sx = {}, ...props }) => {
  const behaviorProps = link ? { component: Link, to: link } : {};

  return (
    <Button
      {...behaviorProps}
      variant='contained'
      sx={{ ...styles.defaultSkipButton, ...sx }}
      endIcon={<SkipNextIcon htmlColor='black' />}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SkipButton;