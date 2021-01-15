import React from 'react'
import { Rate } from 'antd'
import { useSelector } from "react-redux";

function RateScore() {
    const user = useSelector(state => state.user)

    if (user.userData && !user.userData.isAuth) {
        return (
            <div>
                <Rate allowHalf disabled defaultValue={0} />
            </div>
        )
    } else {
        return (
            <div>
                <Rate allowHalf defaultValue={0} />
            </div>
        )
    }
}

export default RateScore
