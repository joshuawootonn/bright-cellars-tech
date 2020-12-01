import { useEffect, useState } from 'react';
import { GET_WINE_TAGS } from '../constants/endpoints';


const deriveViewModelFromResponse = (response) => response.taste_tags;

const useWineTags = (wine) => {
    const [wineTags, setWineTags] = useState(null);
    const [state, setState] = useState('empty');

    useEffect(() => {
        if (!wine) {
            setState('empty');
            setWineTags(null);
            return;
        }
        setState('loading');
        fetch(GET_WINE_TAGS(wine.id), { method: 'GET' })
            .then((response) => response.json())
            .then((data) => setWineTags(deriveViewModelFromResponse(data)))
            .then(() => setState('success'))
            .catch(() => setState('error'));
    }, [wine && wine.id]);

    return {
        state,
        wineTags,
    };
};

export default useWineTags;
