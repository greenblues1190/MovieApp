import React from 'react';
import { Descriptions } from 'antd';

function ProfileInfo(props) {
    let { profile } = props;

    return (
        <Descriptions title="My Profile" layout="vertical">
            <Descriptions.Item label="First Name">{profile.name}</Descriptions.Item>
            <Descriptions.Item label="Last Name">{profile.lastname}</Descriptions.Item>
            <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
            <Descriptions.Item label="Image">{profile.image}</Descriptions.Item>
        </Descriptions>
    )
}

export default ProfileInfo
