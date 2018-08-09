import React from 'react';
import PropTypes from 'prop-types';

const NewsCard = props => (
    <div className="card">
        {
            props.img ? (
                <img className="card__img" src={props.img} alt={props.title} />
            ) : null
        }
        <h2 className="card__title">{props.title}</h2>
    </div>
)

NewsCard.propTypes = {
    img: PropTypes.string,
    title: PropTypes.string,
};

export default NewsCard;