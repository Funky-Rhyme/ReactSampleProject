
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu, Breadcrumb } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ReactComponent as GroupIcon } from "./img/285648_group_user_icon.svg";
import Icon from "@ant-design/icons";
import UsersGrid from "./UsersGrid";
import UserPosts from "./UserPosts";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;



export default function LayoutSider() {
    return (
    <Router>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
          ></Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
                <Link to="/" > Home </Link> 
            </Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
              >
                <SubMenu key="sub1" title="Меню">
                  <Menu.Item key="1">
                    <Icon
                      component={GroupIcon}
                      style={{ fontSize: "23px", paddingRight: "10px" }}
                    ></Icon>
                    <Link to="/users" > Пользователи </Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Switch>
                <Route path="/users">
                    <UsersGrid />
                    <Route path="/posts/:username" component={UserPosts}/>
                </Route>
                <Route path="/">
                    <Layout />
                </Route>
            </Switch>

            <Content style={{ padding: "0 24px", minHeight: 280 }}>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Router>
  );
}
