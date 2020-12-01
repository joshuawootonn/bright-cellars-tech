import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styles from './styles.scss';
import Header from './header';
import Detail from './detail';
import useWineDetails from './useWineDetails';
import useWineTags from './useWineTags';
import RatingIndex from './ratingIndex';
import useWineRatings from './useWineRatings';
import RatingForm from './ratingForm';
import useWines from './useWines';

const combineState = (...states) => states.reduce((acc, curr) => {
    if (!!acc && acc !== 'success') {
        return acc;
    }
    return curr;
}, null);

const App = () => {
    const { selectedWine, wines, selectWine } = useWines();
    // I considered combining the detail and tag hook into one here, but decided to model the the hooks after the api,
    // In my experience having the translation layer here instead of in the hooks requires less wrangling from UI adjustments
    const { state: detailState, wineDetails } = useWineDetails(selectedWine);
    const { state: tagState, wineTags } = useWineTags(selectedWine);
    const {
        state: ratingState, wineRatings, averageWineRating, postRating,
    } = useWineRatings(selectedWine);

    const wineDetailState = combineState(detailState, tagState);

    return (
        <div>
            <Header wines={wines} selectedWine={selectedWine} selectWine={selectWine} />
            {!selectedWine && (
                <div className={styles.empty}>
                    <Typography variant="h1" component="h2" gutterBottom>
                        Please select a wine
                    </Typography>
                </div>
            )}
            {selectedWine && (
                <div className={styles.grid}>
                    <Grid
                        container
                        direction="row"
                        spacing={3}
                    >
                        <Detail isLoading={wineDetailState !== 'success'} details={wineDetails} tags={wineTags} />
                        <RatingIndex
                            isLoading={ratingState !== 'success'}
                            average={averageWineRating}
                            ratings={wineRatings}
                        />
                        <RatingForm postRating={postRating} />
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default App;
