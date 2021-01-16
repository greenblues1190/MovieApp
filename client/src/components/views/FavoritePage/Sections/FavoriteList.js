import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button, Popover } from 'antd';
import Util from '../../../util/Util';
import { DEFAULT_IMAGE, IMAGE_BASE_URL } from '../../../config/Config';

function FavoriteList(props) {
    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavoriteList();
    }, [])

    const fetchFavoriteList = () => {
        Axios.post('/api/favorite/getFavoriteList', { userFrom: props.userFrom })
            .then(response => {
                if (response.data.success) {
                    setFavorites(response.data.favoriteList);
                } else {
                    alert('Failed to load favorite list')
                }
            })
    }

    const onClickDelete = (userFrom, movieId) => {
        Axios.post('/api/favorite/removeFavorite', { userFrom, movieId })
            .then(response => {
                if (response.data.success) {
                    fetchFavoriteList();
                } else {
                    alert(response.data.message)
                }
            })
    }

    const renderCardList = Favorites.map((favorite, index) => {
        const content = (favorite.movieImage ? favorite.movieImage : null);
        return (
            <React.Fragment key={index}>
                <tr key={index}>
                    <Popover content={
                        <img src={`${IMAGE_BASE_URL}w500${content}`} alt={DEFAULT_IMAGE} />}
                        title={favorite.movieTitle} >
                        <td>{favorite.movieTitle}</td>
                    </Popover>
                    <td>{Util.getFormatDate(Util.toDate(favorite.createdAt))}</td>
                    <td><Button onClick={() => onClickDelete(favorite.userFrom, favorite.movieId)} >Remove</Button></td>
                </tr>
            </React.Fragment>
        )
    })

    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Added Date</th>
                            <td>Remove</td>
                        </tr>
                    </thead>
                    {renderCardList}
                </table>
            </div>
        </div>
    )
}

export default FavoriteList
