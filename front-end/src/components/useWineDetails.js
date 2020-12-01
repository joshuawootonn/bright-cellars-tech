import { useEffect, useState } from 'react';
import { GET_WINE_DETAILS } from '../constants/endpoints';

const useWineDetails = (wine) => {
    const [wineDetails, setWineDetails] = useState(null);
    const [state, setState] = useState('empty');

    useEffect(() => {
        if (!wine) {
            setState('empty');
            setWineDetails(null);
            return;
        }
        setState('loading');
        fetch(GET_WINE_DETAILS(wine.id), { method: 'GET' })
            .then((response) => response.json())
            .then((data) => setWineDetails(data))
            .then(() => setState('success'))
            .catch(() => setState('error'));
    }, [wine && wine.id]);

    return {
        state,
        wineDetails,
    };
};

export default useWineDetails;
