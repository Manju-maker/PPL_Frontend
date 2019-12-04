import React from 'react';
import Register from './register';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router-dom'
import Login from './login';
import ForgotPassword from './forgotPassword';
import Timeline from './timeline';
import Index from './index';
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
                   <Route path='/index' component={Index} />
                <Route exact path='/myPost/:picname' component={SinglePost} />
                </Switch>
                
            </main>
        )
    }
}
export default Main;