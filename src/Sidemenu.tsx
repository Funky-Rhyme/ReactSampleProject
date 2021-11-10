import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Menu, } from 'antd';
import Icon from '@ant-design/icons';
import { MailOutlined } from '@ant-design/icons';
import {ReactComponent as GroupIcon} from './img/285648_group_user_icon.svg';
/* import {ReactComponent as UserIcon} from './img/285645_user_icon.svg'; */ 

const { SubMenu } = Menu;

class Sider extends React.Component {
  handleClick = (e: any) => {
    console.log('click ', e);
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation">
            <Menu.Item key="1">
            <Icon component={GroupIcon} style={{fontSize: '23px', paddingRight: '10px'}}></Icon>
              Users
              </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default Sider;