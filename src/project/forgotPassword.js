import React from 'react';

class ForgotPassword extends React.Component{
render(){
    return(
        <div>
                <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="register_sec">
                <h1>Forgot Password</h1>
                <ul>
                  <li><span>Enter E-mail ID</span><input type="text" placeholder="User@gmail.com" /></li>
                  <li><input type="submit" defaultValue="Submit" /></li>
                </ul>
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