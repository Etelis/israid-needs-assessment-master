import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { Button, Stack } from '@mui/material';
import React from 'react';
import { SkipButton } from '../../SkipButton/SkipButton';
import styles from './styles';

const Controls = ({ onPrev, canGoPrev, canGoNext, onSkip }) => {
  return (
    <Stack margin={2} spacing={2}>
      <Button
        fullWidth
        disabled={!canGoNext}
        type='submit'
        endIcon={<ArrowForwardOutlinedIcon />}
        sx={(theme) => styles.nextButton(theme, !canGoNext)}
      >
        Next
      </Button>
      <Stack direction='row' justifyContent='space-between' margin={'15px'}>
        <Button
          sx={styles.actionButton}
          onClick={onPrev}
          disabled={!canGoPrev}
          startIcon={<ArrowBackIosNewIcon />}
        >
          Previous
        </Button>
        <SkipButton sx={styles.actionButton} onClick={onSkip}>
          Skip
        </SkipButton>
      </Stack>
    </Stack>
  );
};

export default Controls;
