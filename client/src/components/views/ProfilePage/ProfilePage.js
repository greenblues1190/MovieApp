import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { Typography } from 'antd';
import ProfileInfo from './Sections/ProfileInfo';
import { USER_SERVER } from '../../config/Config';

const { Title } = Typography;

function ProfilePage() {
    const [Profile, setProfile] = useState([])

    useEffect(() => {
        let _id = localStorage.getItem('userId')
        Axios.post(`${USER_SERVER}/profile`, {_id})
            .then(response => {
                if (response.data.success) {
                    setProfile(response.data.userInfo)
                } else {
                    alert('Failed to load user profile')
                }
            })
    }, [])

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            {/* Header */}
            <div>
                <Title level={2}>My Profile</Title>
            </div>
            {/* Body */}
            <div >
                {/* Person Info */}
                <ProfileInfo
                    profile={Profile}
                />
            </div>
        </div>
    )
}

export default ProfilePage
