import React, { useEffect, useState } from 'react';
import { API_URL, IMAGE_BASE_URL } from '../../config/Config';
import { API_KEY } from '../../config/api_key';
import MainImage from '../commons/MainImage';
import PersonInfo from './Sections/PersonInfo';
import { Row } from 'antd';

function PersonDetail(props) {
    let person_id = props.match.params.personId;
    const [Person, setPerson] = useState([]);

    useEffect(() => {
        let endpointPersonInfo = `${API_URL}person/${person_id}?api_key=${API_KEY}`

        fetch(endpointPersonInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setPerson(response)
            })
    }, [])


    return (
        <div>

            {/* Header */}

            <MainImage
                image={`${IMAGE_BASE_URL}w1280${Person.profile_path}`}
                title={`${Person.name}`}
                overview={`${Person.biography}`}
            />

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                {/* Person Info */}
                <PersonInfo
                    person={Person}
                />

            </div>
        </div>
    )
}

export default PersonDetail
