import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styles from './styles.scss';
import Header from './header';
import { GET_WINES } from '../constants/endpoints';
import Detail from './detail';
import useWineDetails from './useWineDetails';
import useWineTags from './useWineTags';
import RatingIndex from './ratingIndex';
import useWineRatings from './useWineRatings';
import RatingForm from './ratingForm';
import Progress from './progress';


const combineState = (...states) => states.reduce((acc, curr) => {
    if (!!acc && acc !== 'success') {
        return acc;
    }
    return curr;
}, null);

const App = () => {
    const [wines, setWines] = useState([]);
    const [selectedWine, setSelectedWine] = useState(null);
    const { state: detailState, wineDetails } = useWineDetails(selectedWine);
    const { state: tagState, wineTags } = useWineTags(selectedWine);
    const {
        state: ratingState, wineRatings, avgWineRating, postRating,
    } = useWineRatings(selectedWine);

    useEffect(() => {
        fetch(GET_WINES(), { method: 'GET' })
            .then((response) => response.json())
            .then((data) => setWines(data));
    }, []);

    const wineDetailState = combineState(detailState, tagState);

    return (
        <div>
            <Header wines={wines} selectedWine={selectedWine} selectWine={setSelectedWine} />
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
                        {wineDetailState === 'success'
                            ? <Detail details={wineDetails} tags={wineTags} />
                            : (
                                <Grid item xs={12} md={4}>
                                    <Progress />
                                </Grid>
                            )}

                        {
                            ratingState === 'success' ? (
                                <>
                                    <RatingIndex avg={avgWineRating} ratings={wineRatings} />
                                    <RatingForm postRating={postRating} />
                                </>
                            )
                                : (
                                    <Grid item xs={12} md={8}>
                                        <Progress />
                                    </Grid>
                                )
                        }
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default App;
