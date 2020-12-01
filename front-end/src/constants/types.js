import PropTypes from 'prop-types';

export const WINE = PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
});

export const WINE_DETAIL = PropTypes.shape({
    name: PropTypes.string,
    brand_name: PropTypes.string,
    varietal_name: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    brand_id: PropTypes.number,
    varietal_id: PropTypes.number,
});

export const WINE_TAGS = PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
}));

export const WINE_RATINGS = PropTypes.arrayOf(PropTypes.shape({
    rating: PropTypes.number,
    review: PropTypes.string,
    id: PropTypes.number,
}));
