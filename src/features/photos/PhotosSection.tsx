import Work from '@images/work.png';
import { Box, Typography, Pagination } from '@mui/material';
import { useTranslation } from 'react-i18next';
import usePhotosStyle from './PhotosSection.style';
import { usePhotosQuery } from '@services/photo.api';
import { LoadingPage } from '@pages';
import { useState, ChangeEvent } from 'react';

const PhotosSection = () => {
    const { classes } = usePhotosStyle();
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const limit = 40;
    const count = 5000 / limit;
    const { data: photos, isLoading, isFetching } = usePhotosQuery({ _start: page, _limit: limit });

    if (isLoading) return <LoadingPage />;

    const handleChangePage = (_: ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    return (
        <Box className={classes.container}>
            <Typography paddingBottom={2} variant="h3" color="secondary" width="100%">
                {t('titles.photos')}
            </Typography>
            {isFetching ? (
                <LoadingPage />
            ) : (
                <Box className={classes.photosContainer}>
                    {photos?.map((photo) => {
                        return (
                            <Box key={photo.id} className={classes.photoContainer}>
                                <img src={photo.thumbnailUrl} />
                            </Box>
                        );
                    })}
                </Box>
            )}
            <Box className={classes.paginationContainer}>
                <Pagination count={count} variant="outlined" shape="rounded" onChange={handleChangePage} />
            </Box>
        </Box>
    );
};

export default PhotosSection;
