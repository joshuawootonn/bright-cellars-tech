import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Skeleton from '@material-ui/lab/Skeleton';
import styles from './styles.scss';
import { WINE_RATINGS } from '../constants/types';

function getRandomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

const RatingIndex = ({ ratings, average, isLoading }) => (
    <Grid item xs={12} md={4}>
        <Paper className={styles.paper}>
            <Typography variant="h5" gutterBottom>
                Reviews
            </Typography>
            <Typography variant="subtitle1" style={{ fontWeight: 500 }} gutterBottom>
                {isLoading ? <Skeleton width="40%" /> : `Average Rating: ${average}`}
            </Typography>
            <List>
                {isLoading ? (
                    <>
                        {new Array(4).fill('').map((val, i) => (
                            // I would recommend using the map index here, but the lint rules prevent this.
                            // Since we are not altering the list, but rather generating it in place, keys are not going to help us regardless.
                            // I am using performance.now() since it is going to be truly unique rather than Math.random() or something.
                            // But I think it's a great opportunity to have a conversation about this lint rule to see if it is helping :)
                            <React.Fragment key={performance.now()}>
                                <ListItemText
                                    // I like using styles here, it makes sure that MUI doesn't override our className
                                    // and specific styles like these are not very reusable across files.
                                    style={{
                                        marginTop: '0.5rem',
                                        marginBottom: '0.5rem',
                                        paddingLeft: '1rem',
                                    }}
                                    primary={(
                                        <Skeleton
                                            variant="text"
                                            width={`${getRandomBetween(30, 60)}%`}
                                        />
                                    )}
                                    secondary={(
                                        <Skeleton
                                            variant="rect"
                                            width="100%"
                                            height={getRandomBetween(50, 180)}
                                        />
                                    )}
                                />

                                {i < 4 && <Divider />}
                            </React.Fragment>
                        ))}
                    </>
                ) : ratings.map((rating, i) => (
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
                ))}
            </List>
        </Paper>
    </Grid>
);

RatingIndex.defaultProps = {
    ratings: null,
    average: null,
};

RatingIndex.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    ratings: WINE_RATINGS,
    average: PropTypes.number,
};

export default RatingIndex;
