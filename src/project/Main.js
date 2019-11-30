import React from 'react';
import Register from './register';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router-dom'
import Login from './login';
import ForgotPassword from './forgotPassword';
import Timeline from './timeline';
import Header from './header';
import SinglePost from './singlePost'
//import Upload from './upload';


class Main extends React.Component{
    render(){
        return(
            <main>
                   {/* <Route path='/upload' component={Upload} /> */}

                <Switch>
                   
                   <Route exact path='/' component={Register} />
                   <Route path='/login' component={Login} />
                   <Route path='/forgot' component={ForgotPassword} />
                   <Route path='/timeline' component={Timeline} />
                   <Route path='/singlePost' component={SinglePost} />
                </Switch>
                
            </main>
        )
    }
}
export default Main;