import "../news/news.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export const News = () => {
    const [state, setState] = useState({
        newsList: [],
        limit:3 
      });

    useEffect(() => {
        axios
          .get(`https://s14nv2bq-1337.euw.devtunnels.ms/user/news`)
          .then((res) => {
            setState({ ...state, newsList: res.data });
            console.log(state.newsList);
          })
          .catch((er) => {
            console.log(er);
          });
      }, [state.limit]);
    
      const dataHandler = () => {
        setState({ ...state, limit: ++state.limit });
      }

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
                {state.newsList.map((el,i) => (
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
                <button onClick={dataHandler}>Показать ещё</button>
            </div>
        </div>
    )
}