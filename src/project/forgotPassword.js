import React from 'react';
import axios from 'axios';

class ForgotPassword extends React.Component{
  constructor(props){
    super(props);
    this.state={email:'',pass:'',id:'',forgot:false}
console.log("Forgot Props--",this.state)
  }
  handleChange=(e)=>{
    this.setState({email:e.target.value})
  }
  handlePassword=(e)=>{
    this.setState({pass:e.target.value});
  }

  submitPassword=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:8081/resetPass",this.state).then((response)=>{
      
      console.log(response.data);
    })
    this.props.history.push('/login');
    this.setState({forgot:false})
    this.setState({pass:""})
  }
  handleSubmit=(e)=>{
    console.log("email",this.state)
    e.preventDefault();
    axios.post("http://localhost:8081/forgotPass",this.state).then((response)=>{
      this.setState({id:response.data[0]._id});
      console.log("updated response",response.data[0]._id);
      this.setState({forgot:response.data[0].forgot})
    })
    this.setState({pass:""})
  }
render(){
    return(
        <div>
                <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="register_sec">
                <h1>Forgot Password</h1>

                {this.state.forgot===false ? (
                <form onSubmit={this.handleSubmit}>
                <ul>
                  <li><span>Enter E-mail ID</span>
                  
                  <input type="email" value={this.state.email}  placeholder="User@gmail.com" onChange={this.handleChange} required/></li>
                  <li><input  type="submit" defaultValue="Submit" /></li>
                  
                </ul>
                </form>
                ) : (
                  <form onSubmit={this.submitPassword}>
                <ul>
                  <li><span>re-enter your password</span>
                  
                  <input type="password" value={this.state.pass} placeholder="password" onChange={this.handlePassword} required/></li>
                  <li><input  type="submit" defaultValue="Submit" /></li>
                  
                </ul>
                </form>
                )}
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
export default ForgotPassword;