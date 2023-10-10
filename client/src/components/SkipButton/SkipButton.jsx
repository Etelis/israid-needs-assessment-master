import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const SkipButton = ({ children, link, sx = {}, ...props }) => {
  const behaviorProps = link ? { component: Link, to: link } : {};

  return (
    <Button
      {...behaviorProps}
      variant='contained'
      sx={{ py: 2, px: 4, backgroundColor: 'white', color: 'black', border: 'solid 1px lightgrey', ...sx }}
      endIcon={<SkipNextIcon htmlColor='black' />}
      {...props}
    >
      {children}
    </Button>
  );
};
