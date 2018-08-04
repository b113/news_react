import React from 'react';

class NewsCard extends React.Component {
    render() {
        const { img, title } = this.props;
        return (
            <div className="card">
                {
                    img ? (
                        <img className="card__img" src={img} alt={title} />
                    ) : null
                }
                <h2 className="card__title">{title}</h2>
            </div>
        );
    }
};

export default NewsCard;