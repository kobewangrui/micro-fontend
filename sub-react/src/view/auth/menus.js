import React, {Component} from 'react'
import {Row,Button,Space} from 'antd';
import {observer} from 'mobx-react'
import './menus.less'
class Menu extends Component {
	state={
		visibles:false,
		list: [
      {
        id:'1',
        name: '菜单名称x',
        sort: '1',
        herf: '/',
        remark:'菜单名称',
        menuChilds:[
          {
            id:'1',
            name: '菜单名称y',
            sort: '1',
            herf: '/',
            remark:'菜单名称',
            menuChilds:[
              {
                id:'1',
                name: '菜单名称z',
                sort: '1',
                herf: '/',
                remark:'菜单名称',
              },
              {
                id:'2',
                name: '菜单名称z-1',
                sort: '1',
                herf: '/',
                remark:'菜单名称',
              }
            ]
          }
        ]
      },
    ],
		title:'新增',
		loading:false,
		detailValue:'',
		formData:{},
		visible:false,
	}
	componentWillMount(){

  }
	render(){
    const { stage } = this.state.list;
    let stageList = [];
    if ( this.state.list &&  this.state.list.length > 0) {
            this.state.list.map((item, index) => (
               stageList.push(
                 <li className="content" key={index}>
                   <span>
                     <span className="openMenu" >+</span>
                     <span>{item.name}</span>
                   </span>
                   <span style={{width:'150px'}}>{item.sort}</span>
                   <span style={{width:'150px'}}>{item.href}</span>
                   <span>{item.remark}</span>
                   <span>
                    <Button type="link">编辑</Button>
                    <Button type="link">添加</Button>
                    <Button type="link">删除</Button>
                   </span>
                   {
                       item.menuChilds.map((secondItem, i) =>
                       <ul className="secondMenu" key={i}>
                         <li >
                             <span>
                               <span className="openMenu" >+</span>
                               <span>{secondItem.name}</span>
                             </span>
                             <span style={{width:'150px'}}>{secondItem.sort}</span>
                             <span style={{width:'150px'}}>{secondItem.href}</span>
                             <span>{secondItem.remark}</span>
                             <span>
                              <Button type="link">编辑</Button>
                              <Button type="link">添加</Button>
                              <Button type="link">删除</Button>
                             </span>

                             {
                                 secondItem.menuChilds.map((thirdItem, j) =>
                                 <ul className="thirdMenu" key={j}>
                                   <li >
                                       <span>
                                         <span className="openMenu" >+</span>
                                         <span>{thirdItem.name}</span>
                                       </span>
                                       <span style={{width:'150px'}}>{thirdItem.sort}</span>
                                       <span style={{width:'150px'}}>{thirdItem.href}</span>
                                       <span>{thirdItem.remark}</span>
                                       <span>
                                        <Button type="link">编辑</Button>
                                        <Button type="link">添加</Button>
                                        <Button type="link">删除</Button>
                                       </span>
                                   </li>
                                </ul>
                                 )
                             }

                         </li>
                      </ul>
                       )
                   }
                 </li>
               )
           ))
       }
  		return (
  			<div>
  			<Row style={{marginBottom:20}}>
  					<Button type="primary" >新增</Button>
  			</Row>
  				<Row style={{marginBottom:20}}>
          <ul className="menuList">
              <li className="title">
                <span>菜单名称</span>
                <span style={{width:'150px'}}>排序</span>
                <span style={{width:'300px'}}>链接地址</span>
                <span>备注</span>
                <span>操作</span>
              </li>
              {stageList}
            </ul>
  				</Row>
  			</div>
  		)
  }
}

export default Menu
