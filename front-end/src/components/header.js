import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import styles from './header.scss';
import { WINE } from '../constants/types';

const Header = ({ selectedWine, wines, selectWine }) => (
    <AppBar position="static">
        <Toolbar className={styles.toolbar}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedWine || ''}
                onChange={(e) => selectWine(e.target.value)}
                displayEmpty
            >
                <MenuItem value="">None</MenuItem>
                {wines.map((wine) => <MenuItem value={wine} key={wine.id}>{wine.name}</MenuItem>)}
            </Select>
        </Toolbar>
    </AppBar>

);

Header.defaultProps = {
    // defaulting to empty string feels wrong here, but Material UI doesn't like undefined or null
    selectedWine: '',
    selectWine: null,
    wines: [],
};
// I don't have a ton of experience working with prop-types have been using TS recently in it's place.
// Keep that in mind if I miss any best practices!!
Header.propTypes = {
    selectedWine: WINE,
    selectWine: PropTypes.func,
    wines: PropTypes.arrayOf(WINE),
};

export default Header;
