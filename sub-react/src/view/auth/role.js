import React, {Component} from 'react'
import {Row, Col, Table, message, Spin, Button, Popconfirm, Modal, Form, Input,Space} from 'antd';
import {observer} from 'mobx-react'
class Role extends Component {
	state={
		visibles:false,
		list: [
      {
        title: '菜单名称',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '排序',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '链接地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '备注',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a>Invite {record.name}</a>
          </Space>
        ),
      },
    ],
		title:'新增',
		loading:false,
		detailValue:'',
		formData:{},
		visible:false,
    data:[
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
    ]
	}
	componentWillMount(){
		this.roleList();
	}
	authShow = () => {
		this.setState({
			visibles:true
		})

	}
	closeDialogs = () => {
		this.setState({
		  	visibles: false,
		});
	}
	handleSubmits = () => {
		alert('submit');
	}
	deleteItme = (id) => {

	}
	deleteCancel = () => {
		message.error('取消删除');
	}
	closeDialog = () => {
		this.setState({
		  	visible: false,
		});
		this.props.form.resetFields();
	}
	addItem = (type,record) => {
		if(type===1){
			this.props.form.resetFields();
			this.setState({
				formatDate:'',
				detailValue:'',
				visible: true,
				title:'新增',
		  });
		}else if(type===2){
			this.setState({
				formatDate:record.planCompleteDate,
				detailValue:record,
				visible: true,
				title:'编辑',
		  });
		}
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {

			}
		});
	}
	roleList = () => {
		this.setState({
			loading:false,
		})

	}
	render(){
		return (
			<div>
			<Modal title="角色权限" visible={this.state.visibles} onOk={this.handleSubmits} onCancel={this.closeDialogs}>
				<Form labelCol={{ span: 9 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmits}>
					<Row>
						<Col>
							<Form.Item label="名称">
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Item label="备注">
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
			<Row style={{marginBottom:20}}>
				<Col span={2}>
					<Button type="primary" onClick={this.addItem.bind(this,1)}>新增</Button>
				</Col>
			</Row>
				<Row style={{marginBottom:20}}>
						<Spin spinning={this.state.loading} size="large" tip="努力加载中...">
              <Table columns={this.state.list} dataSource={this.state.data}  pagination={false}/>
						</Spin>
				</Row>
			</div>
		)
  }
}

export default Role
