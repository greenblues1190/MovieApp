import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {

    // option
    // null     ->  아무나 출입이 가능한 페이지
    // true     ->  로그인한 유저만 출입이 가능한 페이지
    // false    ->  로그인한 유저는 출입 불가능한 페이지
    function AuthentificationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                if (!response.payload.isAuth) {
                    // 로그인하지 않은 상태
                    if (option) {
                        // 로그인한 유저만 출입이 가능한 페이지를 들어가려고 할 때
                        alert('로그인해야 합니다.');
                        props.history.push('/login');
                    }
                } else {
                    // 로그인한 상태
                    if (adminRoute && !response.payload.isAdmin) {
                        // 어드민이 아닌 유저가 어드민만 출입이 가능한 페이지를 들어가려고 할 때
                        props.history.push('/');
                    } else {
                        if (option === false) {
                            // 로그인한 유저가 출입 불가능한 페이지를 들어가려고할 때 (ex. login page, register page)
                            alert('로그인 상태입니다.');
                            props.history.push('/');
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        );
    }

    return AuthentificationCheck;
}