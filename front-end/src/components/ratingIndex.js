import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import styles from './App.scss';
import { WINE_RATINGS } from '../constants/types';

const RatingIndex = ({ ratings, avg }) => (
    <Grid item xs={12} md={4}>
        <Paper className={styles.paper}>
            <Typography variant="h5" gutterBottom>
                Reviews
            </Typography>
            <Typography variant="subtitle1" style={{ fontWeight: 500 }} gutterBottom>
                Average Rating:
                {' '}
                {avg}
            </Typography>
            <List>
                {ratings.map((rating, i) => (
                    <React.Fragment key={rating.id}>
                        <ListItemText
                            style={{
                                marginTop: '0.5rem',
                                marginBottom: '0.5rem',
                                paddingLeft: '1rem',
                            }}
                            inset
                            primary={(
                                <Typography variant="subtitle1" style={{ fontWeight: 500 }} gutterBottom>
                                    Rating:
                                    {' '}
                                    {rating.rating}
                                </Typography>
                            )}
                            secondary={(
                                <Typography variant="body2" gutterBottom>
                                    {rating.review}
                                </Typography>
                            )}
                        />
                        {i !== ratings.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                )) }
            </List>
        </Paper>
    </Grid>
);

RatingIndex.propTypes = {
    ratings: WINE_RATINGS.isRequired,
    avg: PropTypes.number.isRequired,
};

export default RatingIndex;
