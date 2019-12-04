import {Link} from 'react-router-dom'
import React from 'react'
import axios from   "axios"
class Timeline extends React.Component{
  constructor(props){
    super(props)
    this.state={ email:"",imageupload:"", userId:"",  picture:[],cat:"", Category:[], showForm:false, date:new Date()   
    }}
   
componentWillMount(){
  
  if(localStorage.getItem("tokenID")){
    //console.log(localStorage.getItem("tokenID"))
    this.props.history.push('/timeline');
  }
  else{
    this.props.history.push('/login');
  }

}

componentDidMount(){
  let Id = {userID:localStorage.getItem("tokenID")}
  axios.post("http://localhost:8081/timeline/getCategories",Id).then((response)=>{
      
 //   console.log("Categories--",response.data);
    this.setState({Category:response.data})
    this.setState({picture:response.data})
    
    //  console.log("array of cat",tthis.state.Category);
    
    });
 
}
     
    handlechange = (e)=>{
   
      const value = e.target.value;
      const name = e.target.name;
      this.setState({
        [name]:value
      })
    }
    handleFile = (e)=>{

      this.setState({imageupload: e.target.files[0] },()=>{

      });
   
    }


    submitform = (e)=>{
e.preventDefault();
let id = localStorage.getItem("tokenID");
let formData = new FormData;
formData.append("email",this.state.email)
formData.append("userId",id)
formData.append("cat",this.state.cat)
formData.append("imageupload",this.state.imageupload)
axios.post("http://localhost:8081/timeline/imageupload",formData).then((response)=>{
  const result = response.data;
this.setState({picture:result})
this.setState({Category:response.data})
console.log("Picture--",this.state.picture)

})
this.setState({showForm:!this.state.showForm})
    
}


 showForm = (e) => {
  
 
  
  return (
    <div> 
          <form onSubmit={this.submitform} >
          <input type = "text" onChange = {this.handlechange} name = "email" required/><br></br><br></br>
          <input type="file"  name="imageupload" onChange={this.handleFile} required/> <br></br><br></br>
                    Category:
                    <select name="cat" onChange={this.handlechange} required>
                    {this.state.Category.length>0? this.state.Category.map((lists)=>{
              return(   
                <option  key={lists.value} value={lists.cat}>{lists.cat}</option>
                    )
              }):""}

          </select>
                    {/* <input type="text" name="cat" onChange={this.handlechange} required /><br></br><br></br> */}
                    
          <input type = "submit" value="upload"  />
          </form>
     </div>
    );
}

handleClick=(e)=>{
  e.preventDefault();
  this.setState({showForm:!this.state.showForm})
  
}

openPost=(e)=>{
  axios.post("http://localhost:8081/timeline/getCategories",this.state).then((response)=>{
   // console.log("Single Post data ",response.data)
    this.props.history.push('/singlePost');
  })
 
}

render(){
    return(
        
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span>
               <a href="#"  onClick={this.handleClick}>Upload Post</a> </div>
               
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> 
              <a href="#">Upload Category</a> </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                <div className="rght_list">
                  {this.state.Category.length>0 ? this.state.Category.map((cate)=>{
                    return(
                
                        <div className="rght_list">
                        <ul>
                        <li><a href="#" style={{color:"black",fontSize:20}}><span className="list_icon"><img style={{width: 50,height: 50}} src= {`http://localhost:8081/${cate.imageupload}`} /></span>{cate.cat}</a></li>
                         
                        </ul>
                      </div>
                        
                    )
                  }) : ""}
                </div>
              </div>
              <div className="rght_cate">
              <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                <div className="sub_dwn">
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="images/feat_img1.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Cats</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="images/feat_img2.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="images/feat_img3.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Rabbits</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content_lft">
              <div className="contnt_1">
                <div className="list_1">
                  <ul>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Friends</li>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Flaged</li>
                  </ul>
                </div>
                <div className="timeline_div">
                  <div className="timeline_div1">
                    <div className="profile_pic">
                      <img src="images/timeline_img1.png" />
                      <div className="profile_text"><a href="#">Change Profile Pic</a></div>
                    </div>
                    <div className="profile_info">
                      <div className="edit_div"><a href="#">Edit <img src="images/timeline_img.png" /></a></div>
                      <div className="profile_form">
                        <ul>
                          <li>
                            <div className="div_name1">Name :</div>
                            <div className="div_name2"></div>
                          </li>
                          <li>
                            <div className="div_name1">Sex :</div>
                            <div className="div_name2">Female</div>
                          </li>
                          <li>
                            <div className="div_name1">Description :</div>
                            <div className="div_name3">This is an example of a comment. You can create as many comments like this one
                              or sub comments as you like and manage all of your content inside Account.</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="timeline_div2">
                    <ul>
                      <li><a href="#" className="active">Timeline    </a></li>
                      <li><a href="#">About  </a></li>
                      <li><a href="#">Album</a></li>
                      <li><a href="#"> Pets</a></li>
                      <li><a href="#">My Uploads </a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                
                  {this.state.showForm ? this.showForm() : null}
                   
                <h1>{this.state.picture.length>0 ? this.state.picture.map((pic)=>{
                    return(
                      <div>
                      <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">User Interface PSD Source files Web Designing for web</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">{pic.cat}</div>
                  </div>
                  <div className="div_top">
          
                    <div className="div_top_lft"><img src="images/img_6.png" />{pic.email}</div>
                    <div className="div_top_rgt"><span className="span_date">{pic.uploadTime.slice(0,10)}</span><span className="span_time">{pic.uploadTime.slice(11,16)}</span></div>
                  </div>
                  </div>
                  </div>
                    <Link to={`/myPost/${pic._id}`}><img style={{width:400 ,height:300}} src={`http://localhost:8081/${pic.imageupload}`} alt={this.state.alt}/> </Link>                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>0 Likes</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>{pic.comment.length} Comments</a></li>
                      </ul>
                    </div>
                  </div>
                        
                      </div>
                    )
                  }):""}</h1>
                
                    
                 
                    </div>
                 
              <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">User Interface PSD Source files Web Designing for web</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Cats</div>
                  </div>
                  <div className="div_top">
                    <div className="div_top_lft"><img src="images/img_6.png" />Steave Waugh</div>
                    <div className="div_top_rgt"><span className="span_date">02 Jan 2014</span><span className="span_time">11:15am</span></div>
                  </div>
                  <div className="div_image"><img src="images/lft_img.png" alt="pet" /></div>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>0 Likes</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>4 Comments</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">User Interface PSD Source files Web Designing for web</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Dogs</div>
                  </div>
                  <div className="div_top">
                    <div className="div_top_lft"><img src="images/img_6.png" />Steave Waugh</div>
                    <div className="div_top_rgt"><span className="span_date">02 Jan 2014</span><span className="span_time">11:15am</span></div>
                  </div>
                  <div className="div_image"><img src="images/lft_img1.png" alt="pet" /></div>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>0 Likes</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>4 Comments</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        
        
    )
}
}
export default Timeline;