import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { withRouter } from "react-router-dom"
import 'antd/dist/antd.css';
import '../../style/index.css';
import routes from '../../routes/index';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined,MenuFoldOutlined,MenuUnfoldOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Dashboard extends Component{
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  go=({ item, key, keyPath, domEvent })=> {   //onClik那里虽然看不到传值,但是默认会传过来四个参数,详见官网
        this.props.history.push(key)   //编程式导航
     }
  render(){
    return (
    <Layout className="background1">
      {JSON.stringify(this.props)}
    <Header className="site-layout-background" style={{ padding: 0,height:50}}>
    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'trigger',
      onClick: this.toggle,
    })}
    <div className="logo"/>
    </Header>
      <Layout>
        <Sider width={200} className="site-layout-background1"  trigger={null} collapsible collapsed={this.state.collapsed}>
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="/" icon={<UserOutlined />} title="用户管理">
              <Menu.Item key="/rush" onClick={this.go}>菜单管理</Menu.Item>
              <Menu.Item key="/rush1" onClick={this.go}>option2</Menu.Item>
              <Menu.Item key="/rush2" onClick={this.go}>option3</Menu.Item>
              <Menu.Item key="/rush3" onClick={this.go}>option4</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
             {this.props.routes}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
}


export default withRouter(Dashboard)
