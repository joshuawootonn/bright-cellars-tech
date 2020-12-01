import { useEffect, useState } from 'react';
import { GET_WINE_RATINGS, POST_WINE_RATING } from '../constants/endpoints';

const deriveViewModelFromResponse = ({ ratings }) => ({
    ratings,
    average: Math.floor(100 * (ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length)) / 100,
});

const useWineRatings = (wine) => {
    const [ratings, setWineRatings] = useState(null);
    const [state, setState] = useState('empty');

    const fetchAllRatings = () => {
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
    };

    useEffect(() => {
        fetchAllRatings();
    }, [wine && wine.id]);

    const postRating = (rating) => {
        fetch(POST_WINE_RATING(wine.id), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rating),
        })
            .then(fetchAllRatings);
    };

    return {
        state,
        wineRatings: ratings && ratings.ratings,
        averageWineRating: ratings && ratings.average,
        postRating,
    };
};

export default useWineRatings;
