
import React from "react";
import axios from   "axios"
class Formcomponent extends React.Component{
constructor(props){
    super(props)
    this.state={
        email:"",
        imageupload:""
    }}
    handlechange = (e)=>{
        this.setState({email:e.target.value})
    }
    handleFile = (e)=>{
        this.setState({imageupload: e.target.files[0] });

    }
    submitform = (e)=>{
e.preventDefault()
let formData = new FormData;
formData.append("email",this.state.email)
formData.append("imageupload",this.state.imageupload)
axios.post("http://localhost:8081/timeline/imageupload",formData)

    
}

render(){
    return(
<div>

<form onSubmit={this.submitform}>
<input type = "text" onChange = {this.handlechange} name = "email"/>
<input
            type="file"
            name="imageupload"
            onChange={this.handleFile}
          />
          
<input type = "submit" />

</form>



</div>



    )
}



}
export default Formcomponent;