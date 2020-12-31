import React,{Component} from 'react';
import {SystemRouter} from '../routes/index';
import {mockroute} from '../routes/config';
import {withRouter} from "react-router-dom";
import 'antd/dist/antd.css';
import '../style/index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class System extends Component  {
  state = {
    collapsed: false,
    menuTreeNode:[]
  };
  componentDidMount(){
    const menuTreeNode =this.renderTree(mockroute);
    this.setState({
      menuTreeNode: menuTreeNode
    });
  }
  renderTree = (data) =>{
      return data.map((item) =>{
        if(item.children&&item.children.length>0){
          return (
            <SubMenu key={item.path}  title={item.name}>
              {this.renderTree(item.children)}
            </SubMenu>
          )
        }else{
          return(
            <Menu.Item key={item.path} title={item.name}>
              {item.name}
            </Menu.Item>
          )
        }
      })
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  handleClick = e => {
    console.log(this.props);
    this.props.history.push(e.key)
  };
  render() {
     const { collapsed } = this.state;
      return (
      // 渲染菜单是需要树状路由结构
        // 渲染systemRouter是需要平级路由结构的
            <Layout style={{ minHeight: '100vh' }}>
              <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"   onClick={this.handleClick}>
                  {this.state.menuTreeNode}
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                  <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <SystemRouter  style={{ float:'left' }}/>
                  </div>
                </Content>
              </Layout>
            </Layout>
      );
  }
}
export default withRouter(System);
