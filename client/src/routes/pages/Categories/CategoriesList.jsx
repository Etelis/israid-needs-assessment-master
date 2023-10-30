import PoolIcon from '@mui/icons-material/Pool';
import { Card, IconButton, Paper, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { DownloadRnaFileMenuButton } from '../../../components/DownloadRnaFileMenuButton';
import { useNavbarButtonsContext } from '../../../components/Navbar/useNavbarButtonsContext';
import ProgressOverview from '../../../components/ProgressOverview';
import categories from '../../../static-data/categories.json';
import QuestionCategory from '../Categories/QuestionCategory';
import { useCategoriesContext } from './context/useCategoriesContext';
import styles from './styles';
import Emergency from '../../../enums/Emergency';

const getViewCategories = (subCategories) =>
	categories.map((x) => {
		const categorySubCategories = subCategories.filter(
			(y) => y.categoryId === x.id
		);

		return {
			...x,
			subCategories: categorySubCategories,
			totalQuestionAmount: categorySubCategories.reduce(
				(amount, x) => amount + x.questions.length,
				0
			),
			answeredQuestionAmount: categorySubCategories.reduce(
				(amount, x) => amount + x.answers.length,
				0
			),
		};
	});

const CategoriesList = () => {
	const { subCategories, rnaAnswers, questions, rna } =
		useCategoriesContext();
	const { setNavbarButtons } = useNavbarButtonsContext();

	useEffect(() => {
		setNavbarButtons([<DownloadRnaFileMenuButton key='downloadRna' />]);

		return () => {
			setNavbarButtons([]);
		};
	}, []);

	if (!rna) {
		return null;
	}

	const viewCategories = getViewCategories(subCategories);

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
				<Stack direction='row'>
					<IconButton disabled>
						<PoolIcon />
					</IconButton>
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
				</Stack>
			</Paper>
			<Stack pb={3}>
				{viewCategories?.map((x, index) => (
					<QuestionCategory
						key={index}
						title={x.name}
						preview={x.description}
						id={x.id}
						iconSrc={x.iconSrc}
						totalQuestions={x.totalQuestionAmount}
						answeredQusetion={x.answeredQuestionAmount}
						subCategories={x.subCategories}
					></QuestionCategory>
				))}
			</Stack>
		</Stack>
	);
};

export default CategoriesList;
