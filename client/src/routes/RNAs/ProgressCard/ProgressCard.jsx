import Card from '@mui/material/Card';
import { CardActionArea, CardContent, Grid, Stack, Typography } from '@mui/material';
import { CircularProgressLabel } from '../../../components/CircularProgressLabel/CircularProgressLabel';
import { Link } from 'react-router-dom';

export const ProgressCard = ({ value, lastSyncDate, communityName, route, sx = {}, ...props }) => (
  <Card variant="outlined" sx={{ width: "100%", borderRadius: 'px', ...sx }} {...props}>
    <CardActionArea component={Link} to={route}>
      <CardContent sx={{ "&:last-child": { paddingBottom: "16px" } }}>
        <Stack direction='row' justifyContent='space-between'>
          <Stack>
            <Typography fontSize="x-large" fontWeight="bold">
              {communityName}
            </Typography>
            <Typography variant="caption" sx={{ color: 'Grey' }}>
              {`Last updated: ${lastSyncDate}`}
            </Typography>
          </Stack>
          <CircularProgressLabel value={value} fontSize='small' xs={3} sm={4} md={4} size={60} />
        </Stack>
      </CardContent>
    </CardActionArea>
  </Card >
)