import { useEffect, useState } from 'react';
import { GET_WINES } from '../constants/endpoints';

const useWines = () => {
    const [selectedWine, setSelectedWine] = useState(null);
    const [wines, setWines] = useState([]);
    useEffect(() => {
        fetch(GET_WINES(), { method: 'GET' })
            .then((response) => response.json())
            .then((data) => setWines(data));
    }, []);

    return ({
        wines,
        selectedWine,
        selectWine: setSelectedWine,
    });
};

export default useWines;
