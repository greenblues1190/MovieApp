/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { USER_SERVER } from '../../../config/Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    Axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  const userMenu = (
    <Menu>
      <Menu.Item>
        <a href="/profile">
          My Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="/favorite">
          My Favorites
        </a>
      </Menu.Item>
      <Menu.Item key="logout">
      <a onClick={logoutHandler}>
        Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="signin">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="signup">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Dropdown overlay={userMenu} placement="bottomRight" arrow>
          <Avatar size="large" icon={<UserOutlined />} onClick={e => e.preventDefault()} />
        </Dropdown>
        {/* <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item> */}
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

