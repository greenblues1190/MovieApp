import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button } from 'antd';
import Util from '../../../util/Util';

function FavoriteList(props) {
    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        Axios.post('/api/favorite/getFavoriteList', { userFrom: props.userFrom })
            .then(response => {
                if (response.data.success) {
                    setFavorites(response.data.favoriteList)
                } else {
                    alert('Failed to load favorite list')
                }
            })
    }, [])
    
    return (
        <table>
            <thread>
                <tr>
                    <th>Movie Title</th>
                    <th>Added Date</th>
                    <td>Remove</td>
                </tr>
            </thread>
            <tbody>
                {Favorites.map((favorite, index) => (
                    <tr key={index}>
                        <td>{favorite.movieTitle}</td>
                        <td>{Util.getFormatDate(Util.toDate(favorite.createdAt))}</td>
                        <td><Button>Remove</Button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default FavoriteList
