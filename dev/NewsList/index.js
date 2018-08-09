import React from 'react';
import NewsCard from '../NewsCard';
import styles from './newslist.css';
import logo from './odessa.jpg';

class NewsList extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: 2,
      addNews: false,
      title: '',
      img: '',
      feed: [
        {
          id: 1,
          img: 'http://culturemeter.od.ua/wp-content/uploads/2018/07/4-2-370x245.jpg',
          title: 1, // это я для теста, чтобы показать проверку. это не баг))
        },
        {
          id: 2,
          img: 'http://culturemeter.od.ua/wp-content/uploads/2018/07/Fotor_153148373805423-370x245.jpg',
          title: 'В Лузановке появилось забавное развлечение для туристов',
        },
        {
          id: 3,
          img: 'http://culturemeter.od.ua/wp-content/uploads/2018/07/1-20-370x245.jpg',
          title: 'В Одессу едет звездная британская актриса Жаклин Биссет',
        },
      ],
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.titleHandler = this.titleHandler.bind(this);
    this.imgHandler = this.imgHandler.bind(this);
    this.addNews = this.addNews.bind(this);
  }

  componentWillMount() {
    const newsFeed = JSON.parse(localStorage.getItem('newsFeed'));
    if (newsFeed) {
      this.setState({
        feed: newsFeed,
      });
    }
  }

  componentDidUpdate() {
    const { feed } = this.state;
    const newsFeed = JSON.stringify(feed);
    localStorage.setItem('newsFeed', newsFeed);
  }

  clickHandler(val) {
    const { amount } = this.state;
    this.setState({
      amount: amount + val,
    });
  }

  titleHandler(e) {
    this.setState({
      title: e.target.value,
    });
  }

  imgHandler(e) {
    this.setState({
      img: e.target.value,
    });
  }

  addNews(e) {
    e.preventDefault();
    const { img, title, feed } = this.state;
    const newsItem = {
      id: Date.now(),
      img,
      title,
    };

    feed.push(newsItem);

    this.setState({
      addNews: false,
      title: '',
      img: '',
    });
  }

  render() {
    const {
      amount, feed, addNews, img, title,
    } = this.state;
    return (
      <div className={styles.news}>
        <img className={styles.news__logo} src={logo} alt="Новости Одессы" />
        <h1 className={styles.news__title}>
          Новости Одессы:
        </h1>
        <div className={styles.news__list}>
          {
            feed.map((item, i) => {
              if (i < amount) {
                return <NewsCard key={item.id} img={item.img} title={item.title} />;
              }
              return null;
            })
          }
        </div>
        {
          addNews ? (
            <form className={styles.addNews} onSubmit={this.addNews}>
              <div className={styles.addNews__field}>
                <label className={styles.addNews__labelImg} htmlFor="photo">
                  Фото к новости:
                  <input
                    type="text"
                    placeholder="Вставьте ссылку на фото"
                    id="photo"
                    className={styles.addNews__inputImg}
                    onChange={this.imgHandler}
                    value={img}
                  />
                </label>
              </div>
              <div className={styles.addNews__field}>
                <label className={styles.addNews__labelTitle} htmlFor="title">
                  Заголовок новости:
                  <input
                    type="text"
                    placeholder="Напишите заголовок новости"
                    className={styles.addNews__inputTitle}
                    id="title"
                    required
                    onChange={this.titleHandler}
                    value={title}
                  />
                </label>
              </div>
              <button type="submit" className={styles.addNews__btn}>
                Сохранить новость
              </button>
            </form>
          ) : (
            <button
              type="button"
              className={styles.news__add}
              onClick={() => this.setState({ addNews: true })}
            >
                Добавить новость
            </button>
          )
        }
        {
          amount < feed.length ? (
            <button
              type="button"
              className={styles.news__button}
              onClick={() => this.clickHandler(2)}
            >
              Показать еще
            </button>
          ) : (
            <p className={styles.news__notification}>
              А новостей на сегодня больше нет.
            </p>
          )
        }
      </div>
    );
  }
}

export default NewsList;
