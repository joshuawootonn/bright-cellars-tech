import { useEffect, useState } from 'react';
import { GET_WINE_RATINGS } from '../constants/endpoints';

const deriveViewModelFromResponse = ({ ratings }) => ({
    ratings,
    avg: Math.floor(100 * (ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length)) / 100,
});

const useWineRatings = (wine) => {
    const [ratings, setWineRatings] = useState(null);
    const [state, setState] = useState('empty');

    useEffect(() => {
        if (!wine) {
            setState('empty');
            setWineRatings(null);
            return;
        }
        setState('loading');
        fetch(GET_WINE_RATINGS(wine.id), { method: 'GET' })
            .then((response) => response.json())
            .then((data) => setWineRatings(deriveViewModelFromResponse(data)))
            .then(() => setState('success'))
            .catch(() => setState('error'));
    }, [wine && wine.id]);


    return {
        state,
        wineRatings: ratings && ratings.ratings,
        avgWineRating: ratings && ratings.avg,
    };
};

export default useWineRatings;
