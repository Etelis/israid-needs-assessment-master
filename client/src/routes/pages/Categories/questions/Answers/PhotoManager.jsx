import GalleryIcon from '@mui/icons-material/Collections';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, CardMedia, Fab, Grid, Stack } from '@mui/material';
import { useRef } from 'react';

const PhotoManager = ({ attachedPhotos, setAttachedPhotos }) => {
	const fileInputRef = useRef(null);

	const handleAttachPhotosClick = () => {
		fileInputRef.current.click();
	};

	const handlePhotoSelect = (event) => {
		const files = event.target.files;

		if (files && files.length > 0) {
			const newPhotos = Array.from(files).map((file) => ({
				name: file.name,
				data: URL.createObjectURL(file),
			}));

			setAttachedPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
		}
	};

	const handleDeletePhoto = (photoIndex) => {
		const updatedPhotos = attachedPhotos.filter(
			(_, index) => index !== photoIndex
		);
		setAttachedPhotos(updatedPhotos);
	};

	return (
		<Stack justifyContent='center'>
			<Button
				startIcon={<GalleryIcon />}
				variant='outlined'
				color='primary'
				onClick={handleAttachPhotosClick}
			>
				Attach Photos
			</Button>
			<input
				type='file'
				multiple
				accept='image/*;'
				ref={fileInputRef}
				style={{ display: 'none' }}
				onChange={handlePhotoSelect}
			/>

			{!!attachedPhotos.length && (
				<Grid
					container
					overflow='auto'
					justifyContent='center'
					my={2}
					spacing={2}
					height='120px'
				>
					{attachedPhotos.map((photo, index) => (
						<Grid item xs={6} key={index}>
							<Box position='relative'>
								<CardMedia
									component='img'
									alt={photo.name}
									height='80'
									image={photo.data}
								/>
								<Box
									position='absolute'
									bottom='-15px'
									left='50%'
									style={{
										transform: 'translateX(-50%)',
									}}
								>
									<Fab
										size='small'
										color='white'
										onClick={() => handleDeletePhoto(index)}
									>
										<DeleteIcon />
									</Fab>
								</Box>
							</Box>
						</Grid>
					))}
				</Grid>
			)}
		</Stack>
	);
};

export default PhotoManager;