import { CardActionArea, CardContent, Card, Stack,Typography,} from '@mui/material';
import { CircularProgressLabel } from '../../../components/CircularProgressLabel/CircularProgressLabel';
import { Link } from 'react-router-dom';
import styles from './styles';

const ProgressCard = ({value,  lastSyncDate,  communityName,  route,sx = {},  ...props}) => (
  <Card
    variant='outlined'
    sx={{ ...styles.defaultProgressCard, ...sx }}
    {...props}
  >
    <CardActionArea component={Link} to={route}>
      <CardContent sx={styles.progressCardContent}>
        <Stack direction='row' justifyContent='space-between'>
          <Stack>
            <Typography fontSize='x-large' fontWeight='bold'>
              {communityName}
            </Typography>
            <Typography variant='caption' sx={styles.lastUpdatedText}>
              {`Last updated: ${lastSyncDate}`}
            </Typography>
          </Stack>
          <CircularProgressLabel value={value} fontSize='small' xs={3} sm={4} md={4} size={60} />
        </Stack>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default ProgressCard;