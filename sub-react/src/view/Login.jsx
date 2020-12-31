import React, { Component } from 'react'
import * as API from '../api/index'
import '../assets/css/login.scss';
import loginLogo from '../assets/image/loginlogo.png'
import userPhone from '../assets/image/username.png'
import pwd from '../assets/image/pwd.png'
import pwdshow from '../assets/image/pwdshow.png'
import pwdhide from '../assets/image/pwdhide.png'
import validCode from '../assets/image/validCode.png'
import resetSuccess from '../assets/image/resetSuccess.png'
import { Tabs, Form, Input, Steps, message } from 'antd';
const { TabPane } = Tabs;
const { Step } = Steps;

export default class Login extends Component {
	constructor(...props){
		super(...props)
		this.state = {
			codeText:'获取验证码',
			codeDisabled:false,
			codeTexts:'获取校验码',
			codeDisableds:false,
			pwdToggle:false,
			inputType:'password',
			islogin:true,
			processStatus:0,
			phone:'',
			password:'',
		}
	}
    UNSAFE_componentWillMount(){
	}
	getCode = event=>{
		let seconds = 60
		let timer = setInterval(()=>{
			if(seconds>0){
				this.setState({
					codeText:`${seconds}s后重新发送`,
					codeDisabled:true,
				})
				seconds -= 1;
			}else{
				this.setState({
					codeText:'获取验证码',
					codeDisabled:false,
				})
				clearInterval(timer);
				seconds = 60;
			}
		},1000)
	}
	getCodes = event=>{
		let seconds = 60
		let timer = setInterval(()=>{
			if(seconds>0){
				this.setState({
					codeTexts:`${seconds}s后重新发送`,
					codeDisableds:true,
				})
				seconds -= 1;
			}else{
				this.setState({
					codeTexts:'获取验证码',
					codeDisableds:false,
				})
				clearInterval(timer);
				seconds = 60;
			}
		},1000)
	}
	eyeToggle = event=>{
		if(this.state.pwdToggle){
			this.setState({
				inputType:'password',
				pwdToggle:false,
			})
		}else{
			this.setState({
				inputType:'text',
				pwdToggle:true,
			})
		}
	}
	toChangePwd = event=>{
		this.setState({
			islogin:false
		})
	}
	handleClick = key=>{
		console.log(key);
	}
	login = ()=>{
		API.POST('/sys/v1/login/phone/pwd',{
			phone:this.state.phone,
			password:this.state.password,
			channel:"web"
		}).then(res=>{
			if(res.code==='000000'){
				window.localStorage.setItem('user',res.data)
				message.success(res.msg)
				this.props.history.push('/')
			}else{
				message.error(res.msg)
			}
		})
	}
	phonechange = (event)=>{
		this.setState({
			phone:event.target.value
		})
	}
	pwdchange = (event)=>{
		this.setState({
			password:event.target.value
		})
	}
	Demo = ()=>{
		const onFinish = (values)=>{
		  console.log('Success:', values);
		};
	}
	onFinishFailed = (errorInfo)=>{
		console.log('Failed:', errorInfo);
	};
	toSecond = (event)=>{
		this.setState({
			processStatus:1
		})
	};
	toThird = (event)=>{
		this.setState({
			processStatus:2
		})
	};
	successFul = (event)=>{
		this.setState({
			processStatus:0,
			islogin:true
		})
	};
    render(){
		let currentState;
		let publicHtml;
		publicHtml= (
			<div>
				<p className="changeTitle">信息管理平台</p>
				<Steps progressDot current={this.state.processStatus} className="changeProcess">
					<Step title="验证身份"/>
					<Step title="重置登录密码"/>
					<Step title="重置成功"/>
				</Steps>
			</div>
		)
		if(this.state.processStatus==0){
			currentState = (
				<div className='changeOuter'>
					<div className='outCenter'>
						{publicHtml}
						<div className="changepwd">
							<Form name="basic" initialValues={{remember: true,}} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
								<Form.Item label="邮箱" name="username" rules={[{required: true,message: '该邮箱未注册，请确认后重新输入'}]}>
									<Input placeholder="请输入" bordered={false}/>
								</Form.Item>
								<Form.Item label="校验码" name="password" rules={[{required: true,message: '校验码错误，请核对或重新获取'}]}>
									<Input placeholder="请输入" bordered={false}/>
									<span className={`getEmailCode ${this.state.codeDisableds?'classDisabled':''}`} onClick={this.getCodes}>{this.state.codeTexts}</span>

								</Form.Item>
								<Form.Item className="centerItem">
									<button className="submitButton" onClick={this.toSecond}>确 定</button>
								</Form.Item>
							</Form>
						</div>
					</div>
				</div>
			)
		}else if(this.state.processStatus==1){
			currentState = (
				<div className='changeOuter'>
					<div className='outCenter'>
						{publicHtml}
						<div className="changepwd">
							<Form name="basic" initialValues={{remember: true,}} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
								<Form.Item label="新密码" name="username" rules={[{required: true,message: '请输入新密码'}]}>
									<Input placeholder="请输入" bordered={false}/>
								</Form.Item>
								<Form.Item label="确认密码" name="password" rules={[{required: true,message: '两次密码不一致，请确认后重新输入'}]}>
									<Input placeholder="请输入" bordered={false}/>
								</Form.Item>
								<Form.Item className="centerItem">
									<button className="submitButton" onClick={this.toThird}>确 定</button>
								</Form.Item>
							</Form>
						</div>
					</div>
				</div>
			)
		}else if(this.state.processStatus==2){
			currentState = (
				<div className='changeOuter'>
					<div className='outCenter'>
						{publicHtml}
						<div className="successComponent">
							<span className="successCircle">
								<img src={resetSuccess}/>
							</span>
							<p>登录密码重置成功</p>
							<p>
								<button className="submitButton" onClick={this.successFul}>确 定</button>
							</p>
						</div>
					</div>
				</div>
			)
		}
		if(this.state.islogin){
			return (
				<div className='loginOuter'>
					<div className='outer'>
						<div className='loginLeft'>
							<img src={loginLogo}/>
						</div>
						<div className='loginRight'>
							<p className='loginTitle'>信息管理平台</p>
							<Tabs defaultActiveKey="1" onChange={this.handleClick}>
								<TabPane tab="密码登录" key="1">
									<div className="loginForm">
										<p className="userIcon">
											<img src={userPhone}/>
											<input placeholder="手机号" value={this.state.phone} onChange={this.phonechange}/>
										</p>
										<p className="pwdIcon">
											<img src={pwd}/>
											<input type={this.state.inputType} placeholder="密码" value={this.state.password} onChange={this.pwdchange}/>
											<img src={this.state.pwdToggle?pwdhide:pwdshow} className='eyeImg' onClick={this.eyeToggle}/>
										</p>
										<p>
											<button onClick={this.login}>登录</button>
										</p>
									</div>
								</TabPane>
								<TabPane tab="快捷登录" key="2">
									<div className="loginForm">
										<p className="userIcon">
											<img src={userPhone}/>
											<input placeholder="手机号"/>
											<img src={userPhone}/>
										</p>
										<p className="pwdIcon">
											<img src={validCode}/>
											<input placeholder="验证码"/>
											<span className={`getCode ${this.state.codeDisabled?'classDisabled':''}`} onClick={this.getCode}>{this.state.codeText}</span>
										</p>
										<p className="forgetPwd">
											<span onClick={this.toChangePwd}>忘记密码</span>
										</p>
										<p>
											<button>登录</button>
										</p>
									</div>
								</TabPane>
							</Tabs>
						</div>
					</div>
				</div>
			)
		}else{
			return(
				<div>
					{currentState}
				</div>
			)
		}
    }
}
