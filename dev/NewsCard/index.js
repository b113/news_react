import React from 'react';
import PropTypes from 'prop-types';
import styles from './newscard.css';

const NewsCard = ({ img, title }) => (
  <div className={styles.card}>
    {
      img ? (
        <img className={styles.card__img} src={img} alt={title} />
      ) : null
    }
    <h2 className={styles.card__title}>
      {title}
    </h2>
  </div>
);

NewsCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default NewsCard;
