import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';

export default function UserNewsView({ newsData }) {
    const [news, setNews] = useState([]);

    useEffect(() => {
        setNews(newsData.map(news => (
            <NewsCard key={news._id} newsProp={news} />
        )));
    }, [newsData]);

    return (
        <div>
            <h1>News</h1>
            {news}
        </div>
    );
} 