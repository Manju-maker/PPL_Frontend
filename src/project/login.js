import {Link} from 'react-router-dom';
import React from 'react';
const axios = require('axios');

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={email:'',pass:'',data:[],data1:''}
    }


componentDidMount(){
 
  if(localStorage.getItem("tokenID")){
   //console.log("Login--TokenId--",localStorage.getItem("tokenID"))
    this.props.history.push('/timeline');
  }
}

handleChange=(e)=>{
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
        [name]:value
    })
}

handleClick=(e)=>{
    e.preventDefault();
    //console.log(this.state)
    axios.post("http://localhost:8081/login",this.state).then((response)=>{
    localStorage.setItem("tokenID",response.data[0]._id);  
    console.log("Login--TokenId--",localStorage.getItem("tokenID"))
    //console.log("Inside login"+JSON.stringify(response.data));
      this.setState({data:response.data});
      //console.log(this.state.data);
        if(this.state.data!=="Invalid Username or Password"){
          if(this.state.data!=="Verify your email id first"){
            
            if(this.state.data.length>0){
                this.props.history.push('/timeline');
            }
          }
        }
        else if(this.state.data==="Verify your email id first"){
          this.setState({data1:response.data})
          console.log(this.state.data1)
        }
        else{
          this.setState({data1:response.data})
        }

    })
}

    render(){
        return(
            <div>
        
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="login_sec">
                <h1>Log In</h1>
                <form onSubmit={this.handleClick}>
                <ul>
                  <li><span>Email-ID</span><input type="text" name="email" onChange={this.handleChange} placeholder="Enter your email" required/></li>
                  <li><span>Password</span><input type="text" name="pass" onChange={this.handleChange} placeholder="Enter your password" required/></li>
                    <p style={{color:'red'}}>{this.state.data1}</p>
                  <li><input type="checkbox" />Remember Me</li>
                  <li><input type="submit" defaultValue="Log In" /><Link to='/forgot'>Forgot Password</Link></li>
                </ul>
                </form>
                <div className="addtnal_acnt">I do not have any account yet.<Link to='/'>Create My Account Now !</Link></div>
              </div>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
              <img src="images/img_9.png" alt="" /> </div>
          </div>
        </div>
       
      </div>

        )
    }
}

export default Login;