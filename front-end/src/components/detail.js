import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styles from './styles.scss';
import productImage from '../assets/wines/folk-and-fable.png';
import { WINE_DETAIL, WINE_TAGS } from '../constants/types';

const Detail = ({ details, tags }) => (
    <Grid item xs={12} md={4}>
        <Paper className={styles.paper}>
            <img
                className={styles.img}
                alt="product"
                src={productImage}
            />
            <Typography variant="h5" gutterBottom>
                {details.name}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                {details.brand_name}
                {' '}
                -
                {' '}
                {details.varietal_name}
            </Typography>

            <Typography variant="body1" gutterBottom>
                {details.description}
            </Typography>
            <Typography variant="body2" gutterBottom>
                Tags:
                {' '}
                {tags.map((tag) => tag.name).join(', ')}
            </Typography>
        </Paper>
    </Grid>
);

Detail.propTypes = {
    details: WINE_DETAIL.isRequired,
    tags: WINE_TAGS.isRequired,
};

export default Detail;
