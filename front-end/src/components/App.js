import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import styles from './App.scss';
import Header from './header';
import { GET_WINES } from '../constants/endpoints';
import Detail from './detail';
import useWineDetails from './useWineDetails';
import useWineTags from './useWineTags';
import RatingIndex from './ratingIndex';
import useWineRatings from './useWineRatings';


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
    const { state: ratingState, wineRatings, avgWineRating } = useWineRatings(selectedWine);

    useEffect(() => {
        fetch(GET_WINES(), { method: 'GET' })
            .then((response) => response.json())
            .then((data) => setWines(data));
    }, []);

    const state = combineState(detailState, tagState, ratingState);

    return (
        <div>
            <Header wines={wines} selectedWine={selectedWine} selectWine={setSelectedWine} />
            {state === 'empty' && (
                <div className={styles.empty}>
                    <Typography variant="h1" component="h2" gutterBottom>
                        Please select a wine
                    </Typography>
                </div>
            )}
            {state === 'loading' && (
                <div className={styles.empty}>
                    <Fade
                        in
                        style={{
                            transitionDelay: '800ms',
                        }}
                        unmountOnExit
                    >
                        <CircularProgress />
                    </Fade>
                </div>
            )}
            {state === 'success' && (
                <div className={styles.grid}>
                    <Grid
                        container
                        direction="row"
                        spacing={3}
                    >
                        <Detail details={wineDetails} tags={wineTags} />
                        <RatingIndex avg={avgWineRating} ratings={wineRatings} />
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default App;
