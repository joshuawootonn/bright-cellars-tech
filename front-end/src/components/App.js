import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import styles from './App.scss';
import Header from './header';
import { GET_WINES } from '../constants/endpoints';
import Detail from './detail';
import useWineDetails from './useWineDetails';


const App = () => {
    const [wines, setWines] = useState([]);
    const [selectedWine, setSelectedWine] = useState(null);
    const { state, wineDetails } = useWineDetails(selectedWine);

    useEffect(() => {
        fetch(GET_WINES(), { method: 'GET' })
            .then((response) => response.json())
            .then((data) => setWines(data));
    }, []);

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
                    <Detail details={wineDetails} />
                </div>
            )}
        </div>
    );
};

export default App;
