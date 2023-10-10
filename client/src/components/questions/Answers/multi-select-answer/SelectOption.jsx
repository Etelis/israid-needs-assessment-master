import { Button } from '@mui/material';
import styles from './styles';

const SelectOption = ({ option, isSelected, onClick }) => (
  <Button
    sx={(theme) => styles.selectOption(theme, isSelected)}
    onClick={onClick}
  >
    {option}
  </Button>
);

export default SelectOption;
