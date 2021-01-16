import React from 'react';
import './Sections/FavoritePage.css';
import FavoriteList from './Sections/FavoriteList';

function FavoritePage() {
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <div>
                <h2>Favorite Movies</h2>
                <hr />
            </div>
            <FavoriteList
                userFrom={localStorage.getItem('userId')}
            />
        </div>
    )
}

export default FavoritePage
