import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import styles from './styles.scss';

const RatingForm = ({ postRating }) => {
    const [formState, setFormState] = useState({ rating: 4, review: '' });
    const [isValid, setIsValid] = useState(false);

    const validate = (nextState) => setIsValid(nextState.rating <= 5
        && nextState.rating > 0
        && nextState.review.length > 0);

    const handleChange = (key, value) => {
        setFormState((prev) => {
            const nextState = {
                ...prev,
                [key]: value,
            };
            validate(nextState);
            return (nextState);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isValid) {
            postRating(formState);
        }
    };

    return (
        <Grid item xs={12} md={4}>
            <Paper className={styles.paper}>
                <form className={styles.formRoot} onSubmit={handleSubmit}>
                    <Typography variant="h5" gutterBottom>
                        New Review
                    </Typography>
                    <Typography gutterBottom>
                        Rating
                    </Typography>
                    <Slider
                        min={1}
                        max={5}
                        value={formState.rating}
                        onChange={(_, value) => handleChange('rating', value)}
                        step={1}
                        valueLabelDisplay="on"
                    />
                    <TextField
                        label="Review"
                        multiline
                        variant="outlined"
                        value={formState.review}
                        fullWidth
                        onChange={(e) => handleChange('review', e.target.value)}
                        margin="normal"
                        style={{ marginBottom: '1.5rem' }}
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        type="submit"
                        disabled={!isValid}
                    >
                        submit review
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
};

RatingForm.propTypes = {
    postRating: PropTypes.func.isRequired,
};

export default RatingForm;
