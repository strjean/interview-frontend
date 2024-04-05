import { makeStyles } from 'tss-react/mui';

export default makeStyles()(() => {
    return {
        container: {
            padding: '25px 0px 0px 30px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        },
        photosContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            height: '100%',
            flex: 1,
            overflowY: 'auto',
        },

        photoContainer: {
            margin: '12px',
            alignItems: 'center',
            justifyContent: 'center',
        },

        paginationContainer: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '10px',
            paddingBottom: '20px',
        },
    };
});
