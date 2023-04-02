import React, {useEffect, useState} from 'react';
import './index.scss';
import Collection from "./components/Collection";
import { useSelector} from "react-redux";
import {useActions} from "./hooks/useActions";

function App() {
    const [searchValue, setSearchValue] = useState('')
    const [page, setPage] = useState(1)
    const [categoryId, setCategoryId] = useState(0)
    const {error, loading, photoSets} = useSelector(state => state.photo)
    const {fetchPhotoSets} = useActions()

    const categories = [
        {"name": "Все"},
        {"name": "Море"},
        {"name": "Горы"},
        {"name": "Архитектура"},
        {"name": "Города"},
    ]

    const pages = [
        {"name": "1"},
        {"name": "2"},
        {"name": "3"},
    ]

    useEffect(() => {
        fetchPhotoSets(categoryId, page);
    }, [categoryId, page])



    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    {categories.map((categ, index) =>
                        <li
                            onClick={() => setCategoryId(index)}
                            className={categoryId === index ? 'active' : ''}
                            key={categ.name}
                        >
                            {categ.name}
                        </li>
                    )}
                </ul>

                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="search-input"
                    placeholder="Поиск по названию"
                />
            </div>
            <div className="content">
                {loading
                    ? (<h2 className="contentItem">Loading...</h2>)
                    : (photoSets.filter(photoSets => {
                        return photoSets.name.toLowerCase().includes(searchValue.toLowerCase());
                    }).map((photoSet, index) =>
                        <Collection key={index} name={photoSet.name} images={photoSet.photos}/>
                    ))
                }
            </div>
            <ul className="pagination">
                {pages.map((value, index) =>
                    <li
                        onClick={() => setPage(index+1)}
                        key={index}
                        className={page === index+1 ? 'active' : ''}
                    >
                        {value.name}
                    </li>
                )}

            </ul>
        </div>
    );
}

export default App;
