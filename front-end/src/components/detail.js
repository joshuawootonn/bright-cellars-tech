import PropTypes from 'prop-types';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import styles from './styles.scss';
import productImage from '../assets/wines/folk-and-fable.png';
import { WINE_DETAIL, WINE_TAGS } from '../constants/types';

const Detail = ({ isLoading, details, tags }) => (
    <Grid item xs={12} md={4}>
        <Paper className={styles.paper}>
            <img
                className={styles.img}
                alt="product"
                src={productImage}
            />
            <Typography component="div" variant="h5" gutterBottom>
                {isLoading ? <Skeleton width="50%" /> : details.name }
            </Typography>
            <Typography component="div" variant="subtitle2" gutterBottom>
                {isLoading ? <Skeleton width="40%" /> : `${details.brand_name} - ${details.varietal_name}`}
            </Typography>

            <Typography component="div" variant="body1" gutterBottom>
                {isLoading ? (
                    <Skeleton variant="rect" width="100%" height={120} />
                ) : details.description }

            </Typography>
            <Typography component="div" variant="body2" gutterBottom>
                {isLoading ? <Skeleton width="60%" /> : `Tags: ${tags.map((tag) => tag.name).join(', ')}`}
            </Typography>
        </Paper>
    </Grid>
);

Detail.defaultProps = {
    details: null,
    tags: null,
};

Detail.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    details: WINE_DETAIL,
    tags: WINE_TAGS,
};

export default Detail;
