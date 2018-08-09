import React from 'react';
import PropTypes from 'prop-types';
import styles from './newscard.css';

const NewsCard = props => (
    <div className={styles.card}>
        {
            props.img ? (
                <img className={styles.card__img} src={props.img} alt={props.title} />
            ) : null
        }
        <h2 className={styles.card__title}>{props.title}</h2>
    </div>
)

NewsCard.propTypes = {
    img: PropTypes.string,
    title: PropTypes.string,
};

export default NewsCard;