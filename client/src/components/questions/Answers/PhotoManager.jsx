import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import GalleryIcon from '@mui/icons-material/Collections';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, CardMedia, Fab, Grid, Stack } from '@mui/material';
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const PhotoManager = ({ attachedPhotos, setAttachedPhotos }) => {
  const webcamRef = useRef(null);
  const [isCameraMode, setIsCameraMode] = useState(false);
  const fileInputRef = useRef(null);

  const handleCapturePhoto = () => {
    const capturedPhoto = webcamRef.current.getScreenshot();
    setAttachedPhotos((prevPhotos) => [
      ...prevPhotos,
      { name: 'Camera Photo', data: capturedPhoto },
    ]);
    setIsCameraMode(false);
  };

  const handleOpenCameraClick = () => {
    setIsCameraMode(true);
  };

  const handleOpenGalleryClick = () => {
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
    <Stack justifyContent='center' m={2}>
      {isCameraMode ? (
        <Box>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            style={{ maxWidth: '100%', display: 'block' }}
          />
          <Stack justifyContent='space-around' direction='row'>
            <Button
              variant='outlined'
              color='primary'
              onClick={handleCapturePhoto}
              style={{ marginTop: '10px' }}
            >
              Capture Photo
            </Button>
            <Button
              variant='outlined'
              color='primary'
              onClick={() => setIsCameraMode(false)}
              style={{ marginTop: '10px' }}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      ) : (
        <Stack direction='row' justifyContent='center' my={2}>
          <Button
            startIcon={<AddAPhotoIcon />}
            variant='outlined'
            color='primary'
            onClick={handleOpenCameraClick}
          >
            Take a New Picture
          </Button>
          <input
            type='file'
            multiple
            accept='image/*;'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handlePhotoSelect}
          />
          <Button
            startIcon={<GalleryIcon />}
            variant='outlined'
            color='primary'
            onClick={handleOpenGalleryClick}
            style={{ marginLeft: '10px' }}
          >
            Choose from Gallery
          </Button>
        </Stack>
      )}

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
