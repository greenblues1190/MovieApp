import React from 'react';
import { Descriptions } from 'antd';

function PersonInfo(props) {
    let { person } = props;

    return (
        <Descriptions title="Person Info" layout="vertical">
            <Descriptions.Item label="Name">{person.name}</Descriptions.Item>
            <Descriptions.Item label="Gender">{person.gender == 1 ? 'Female' : 'Male'}</Descriptions.Item>
            { person.deathday &&
                <Descriptions.Item label="Birthday">{person.birthday}</Descriptions.Item>
            }
            { person.deathday &&
                <Descriptions.Item label="Deathday">{person.deathday}</Descriptions.Item>
            }
            <Descriptions.Item label="Known for Department">{person.known_for_department}</Descriptions.Item>
            { person.homepage &&
                <Descriptions.Item label="Homepage" span={2}>{person.homepage}</Descriptions.Item>
            }
        </Descriptions>
    )
}

export default PersonInfo
