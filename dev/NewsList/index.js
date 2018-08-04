import React from 'react';
import NewsCard from '../NewsCard';


class NewsList extends React.Component {
    constructor() {
        super();
        this.state = {
            amount: 2,
            addNews: false,
            title: '',
            img: '',
            feed: [
                // {
                //     id: 1,
                //     img: 'http://culturemeter.od.ua/wp-content/uploads/2018/07/4-2-370x245.jpg',
                //     title: 'Кинозвезда Эрик Робертс делился в Одессе секретами голливудской жизни'
                // },
                // {
                //     id: 2,
                //     img: 'http://culturemeter.od.ua/wp-content/uploads/2018/07/Fotor_153148373805423-370x245.jpg',
                //     title: 'В Лузановке появилось забавное развлечение для туристов'
                // },
                // {
                //     id: 3,
                //     img: 'http://culturemeter.od.ua/wp-content/uploads/2018/07/1-20-370x245.jpg',
                //     title: 'В Одессу едет звездная британская актриса Жаклин Биссет'
                // }
            ]
        };

        this.clickHandler = this.clickHandler.bind(this);
        this.titleHandler = this.titleHandler.bind(this);
        this.imgHandler = this.imgHandler.bind(this);
        this.addNews = this.addNews.bind(this);
    }
   
    componentWillMount() {
        const feed = JSON.parse(localStorage.getItem('feed'));
        if (feed) {
            this.setState({
                feed
            });
        }
    }

    componentDidUpdate() {
        const feed = JSON.stringify(this.state.feed);
        localStorage.setItem('feed', feed);
    }

    clickHandler(val) {
        this.setState({
            amount: this.state.amount + val
        });
    }

    titleHandler(e) {
        this.setState({
            title: e.target.value
        });
    }

    imgHandler(e) {
        this.setState({
            img: e.target.value
        });
    }

    addNews(e) {
        e.preventDefault();
        const newsItem = {
            id: Date.now(),
            img: this.state.img,
            title: this.state.title
        };

        this.state.feed.push(newsItem);

        this.setState({
            addNews: false,
            title: '',
            img: '',
        });
    }

    render() {
        const { amount, feed } = this.state;
        return (
            <div className="news">
                <h1 className="news__title">Новости Одессы:</h1>
                <div className="card-list">
                    {
                        feed.map((item, i) => {
                            if (i < amount) {
                                return <NewsCard key={item.id} img={item.img} title={item.title} />
                            }
                        })
                    }
                </div>
                {
                    this.state.addNews ? (
                        <form className="addNews" onSubmit={this.addNews}>
                            <div className="addNews__field">
                                <label className="addNews__label-img">Фото к новости: </label>
                                <input
                                    type="text"
                                    placeholder="Вставьте ссылку на фото"
                                    className="addNews__input-img"
                                    onChange={this.imgHandler}
                                    value={this.state.img}
                                />
                            </div>
                            <div className="addNews__field">
                                <label className="addNews__label-title">Заголовок новости: </label>
                                <input
                                    type="text"
                                    placeholder="Напишите заголовок новости"
                                    className="addNews__input-title"
                                    required
                                    onChange={this.titleHandler}
                                    value={this.state.title}
                                />
                            </div>
                            <button className="addNews__btn">Сохранить новость</button>
                        </form>
                    ) : (
                            <button
                                className="news__add"
                                onClick={() => this.setState({ addNews: true })}
                            >
                                Добавить новость
                            </button>
                        )
                }
                {
                    amount < feed.length ? (
                        <button className="news__button" onClick={() => this.clickHandler(2)}>Показать еще</button>
                    ) : <p className="news__notification">А новостей на сегодня больше нет.</p>
                }
            </div>
        );
    }
};

export default NewsList;