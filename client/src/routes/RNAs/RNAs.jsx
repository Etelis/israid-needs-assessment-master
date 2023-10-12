import { Stack, Typography, List } from '@mui/material';
import { ContinueButton } from '../../components/ContinueButton';
import ProgressOverview from '../../components/ProgressOverview';
import { ProgressCard } from './ProgressCard';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../utils/axios';
import styles from './styles';

export const RNAs = () => {
  const { data: rnas = [], isLoading } = useQuery(
    ['rnas'],
    async () => (await api.get('/rnas')).data,
    { refetchOnWindowFocus: false }
  );

  return (
    <Stack spacing={3} sx={styles.rnasPage} alignItems='center'>
      <ProgressOverview
        rightColumnAmount={8512}
        rightColumnCaption='Questions Answered'
        leftColumnAmount={3}
        leftColumnCaption='RNAs Filled'
        isLeftColumnInPercentage={false}
      />
      <List sx={styles.rnasList}>
        {!isLoading &&
          rnas.map(({ id, lastSyncDate, creationDate, communityName }) => (
            <ProgressCard
              sx={styles.rna}
              value={Math.floor(Math.random() * 101)} // TODO: evaluate % based on number of questions answered
              key={id}
              lastSyncDate={new Date(
                lastSyncDate ?? creationDate
              ).toLocaleDateString('en-US')}
              communityName={communityName}
              route={id}
            />
          ))}
      </List>
      <ContinueButton link='add' sx={styles.newRnaButton}>
        <Typography>New RNA</Typography>
      </ContinueButton>
    </Stack>
  );
};