import "../news/news.scss";

export const News = () => {
    const newsArray = [
        {
            newsName: 'Новость 1',
            newsImg: 'img',
            newsDate: '23 июня 2024',
            newsContent: 'СодержаниеСодержаниеСодержание СодержаниеСодержаниеСодержание СодержаниеСодержание СодержаниеСодержаниеСодержание СодержаниеСодержаниеСодержание СодержаниеСодержаниеСодержание'         
        },
        {
            newsName: 'Новость 1',
            newsImg: 'img',
            newsDate: '23 июня 2024',
            newsContent: 'СодержаниеСодержаниеСодержание СодержаниеСодержаниеСодержание СодержаниеСодержание СодержаниеСодержаниеСодержание СодержаниеСодержаниеСодержание СодержаниеСодержаниеСодержание'         
        },
        {
            newsName: 'Новость 1',
            newsImg: 'img',
            newsDate: '23 июня 2024',
            newsContent: 'СодержаниеСодержаниеСодержание СодержаниеСодержаниеСодержание СодержаниеСодержание СодержаниеСодержаниеСодержание СодержаниеСодержаниеСодержание СодержаниеСодержаниеСодержание'         
        }
    ]
    return(
        <div className="main__news container">
            <div className="news__title">
                <p>Новости</p>
            </div>

            <ul className="news__list">
                {newsArray.map((el,i) => (
                    <li className="item">
                        <div className="item__title flex justif-ss-betw">
                            <div className="item__name">
                                {el.newsName}
                            </div>
                            <div className="item__date">
                                {el.newsDate}
                            </div>
                        </div>
                        <div className="item__main flex justif-ss-betw">
                            <div className="item__img">

                            </div>
                            <div className="item__content">
                                {el.newsContent}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="news__btn flex justif-ss-cent">
                <button>Показать ещё</button>
            </div>
        </div>
    )
}