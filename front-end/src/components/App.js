import React, { useEffect, useState } from 'react';
import productImage from '../assets/wines/folk-and-fable.png';
import styles from './App.scss';
import Header from './header';
import { GET_WINES } from '../constants/endpoints';

const App = () => {
    const [wines, setWines] = useState([]);
    const [selectedWine, setSelectedWine] = useState(null);


    useEffect(() => {
        fetch(GET_WINES, { method: 'GET' }).then((response) => response.json())
            .then((data) => {
                setWines(data);
                console.log(data);
                console.log(wines);
            });
    }, []);

    return (
        <div className={styles.container}>
            <Header wines={wines} selectedWine={selectedWine} selectWine={(wine) => setSelectedWine(wine)} />

            <h1>Folk and Fable 2016 Red Blend</h1>
            <img
                alt="product"
                src={productImage}
            />
        </div>
    );
};

export default App;
