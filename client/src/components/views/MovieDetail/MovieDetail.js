import React, { useEffect, useState } from 'react';
import { API_URL, IMAGE_BASE_URL } from '../../config/Config';
import { API_KEY } from '../../config/api_key';
import MainImage from '../commons/MainImage';
import GridCards from '../commons/GridCards';
import MovieInfo from './Sections/MovieInfo';
import Favorite from './Sections/Favorite';
import RateScore from './Sections/RateScore';
import { Space, Switch, Row, Divider } from 'antd';


function MovieDetail(props) {
    let movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [LoadingForMovie, setLoadingForMovie] = useState(true);
    const [CastToggle, setCastToggle] = useState(false);

    useEffect(() => {
        let endpointMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        let endpointCredits = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

        fetch(endpointMovieInfo)
            .then(response => response.json())
            .then(response => {
                // console.log(response)
                setMovie(response)
                setLoadingForMovie(false)
            })

        fetch(endpointCredits)
            .then(response => response.json())
            .then(response => {
                // console.log('responseCredits', response)
                setCasts(response.cast)
            })

    }, [])

    const toggleCastView = () => {
        setCastToggle(!CastToggle)
    }

    return (
        <div>

            {/* Header */}
            {!LoadingForMovie ?
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                    title={`${Movie.original_title}`}
                    overview={`${Movie.overview}`}
                />
                :
                <div>loading...</div>
            }

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Space size="large">
                        <RateScore />
                        <Favorite
                            userFrom={localStorage.getItem('userId')}
                            movieId={movieId}
                        />
                    </Space>
                </div>
                <Divider />
                {/* Movie Info */}
                <MovieInfo
                    movie={Movie}
                />

                <br />
                {/* Casts Grid */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Switch checkedChildren="show cast" unCheckedChildren="hide cast" onClick={toggleCastView} />
                </div>
                {CastToggle &&
                    <Row gutter={[16, 16]}>
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={cast.profile_path ?
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    personId={cast.id}
                                    personName={cast.name} />
                            </React.Fragment>
                        ))}
                    </Row>
                }

            </div>
        </div>
    )
}

export default MovieDetail
