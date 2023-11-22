import PoolIcon from '@mui/icons-material/Pool';
import { Card, IconButton, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { DownloadRnaFileMenuButton } from '../../../components/DownloadRnaFileMenuButton';
import { useNavbarButtonsContext } from '../../../components/Navbar/useNavbarButtonsContext';
import ProgressOverview from '../../../components/ProgressOverview';
import QuestionCategory from '../Categories/QuestionCategory';
import { useCategoriesContext } from './context/useCategoriesContext';
import styles from './styles';
import Emergency from '../../../enums/Emergency';
import { useBreadcrumbsContext } from './context/useBreadcrumbsContext';

const CategoriesList = () => {
	const { categories, rnaAnswers, questions, rna } = useCategoriesContext();
	const { setNavbarButtons } = useNavbarButtonsContext();
	const { setBreadcrumbs } = useBreadcrumbsContext();
	const [expanded, setExpaned] = useState('');

	useEffect(() => {
		setNavbarButtons([<DownloadRnaFileMenuButton rnaId={rna.id} key='downloadRna' />]);
		setBreadcrumbs([
			{ text: "RNA's", routeTo: '/RNAs' },
			{ text: rna.communityName, routeTo: `/RNAs/${rna.id}` },
		]);

		return () => {
			setNavbarButtons([]);
		};
	}, []);

	return (
		<Stack height='90vh' spacing={2} p={1}>
			<Stack mb={1} spacing={1} alignItems='center'>
				<Typography variant='h3' fontSize='46px'>
					{rna.communityName}
				</Typography>
				<Typography variant='h4' fontSize='24px'>
					{rna.emergencies.map((x) => Emergency[x]).join(', ')}
				</Typography>
			</Stack>
			<Paper elevation={5} sx={styles.rnaCard}>
				<Card sx={styles.rnaOverview}>
					<ProgressOverview
						leftColumnAmount={Math.floor(
							(rnaAnswers.length / questions.length) * 100
						)}
						leftColumnCaption={'Form Completed'}
						rightColumnAmount={rnaAnswers.length}
						rightColumnCaption={'Questions Answered'}
					/>
				</Card>
			</Paper>
			<Stack pb={3}>
				{categories?.map((x, index) => (
					<QuestionCategory
						key={index}
						category={x}
						isExpanded={expanded === x.name}
						setExpanded={setExpaned}
					></QuestionCategory>
				))}
			</Stack>
		</Stack>
	);
};

export default CategoriesList;
