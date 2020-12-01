import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import styles from './styles.scss';

const Progress = () => (
    <div className={styles.center}>
        <Fade
            in
            style={{
                transitionDelay: '200ms',
            }}
            unmountOnExit
        >
            <CircularProgress />
        </Fade>
    </div>
);

export default Progress;
