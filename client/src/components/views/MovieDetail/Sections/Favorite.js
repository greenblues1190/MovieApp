import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button } from 'antd';
import { useSelector } from "react-redux";

function Favorite(props) {
    const user = useSelector(state => state.user)

    const userFrom = props.userFrom;
    const movieId = props.movieId;

    let variables = {
        userFrom,
        movieId
    };

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [IsFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        // Favorite 수 가져오기
        Axios.post('/api/favorite/favoriteNumber', movieId)
            .then(response => {
                console.log('favoriteNumber', response.data)
                if (response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber)
                } else {
                    alert(response.data.message)
                }
            })

        // 사용자가 favorite을 했는지 체크
        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                console.log('isFavorited', response.data)
                if (response.data.success) {
                    setIsFavorited(response.data.isFavorited)
                } else {
                    alert(response.data.message)
                }
            })

    }, [])

    const onClickFavorite = () => {
        if (IsFavorited) {
            // 이미 Favorite에 추가되었다면 Favorite에서 삭제한다
            Axios.post('/api/favorite/removeFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setIsFavorited(false)
                    } else {
                        alert(response.data.message)
                    }
                })
        } else {
            // Favorite에 추가되지 않았다면 Favorite에 추가한다
            Axios.post('/api/favorite/addFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setIsFavorited(true)
                    } else {
                        alert(response.data.message)
                    }
                })
        }
    }

    if (user.userData && !user.userData.isAuth) {
        return (
            <div>
                <Button onClick={onClickFavorite} disabled>Favorite This {FavoriteNumber}</Button>
            </div>
        )
    } else {
        return (
            <div>
                <Button onClick={onClickFavorite}>{IsFavorited ? "Unfavorite This" : "Favorite This"} {FavoriteNumber}</Button>
            </div>
        )
    }
}

export default Favorite