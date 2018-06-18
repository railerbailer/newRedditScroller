import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Icon, Button, Switch } from 'antd';
import {subredditArray, secondTheme} from '../subreddits'
import logo from '../logo.svg'
import '../App.css'

// import ArrowKeysReact from 'arrow-keys-react';




class Startpage extends Component {
  constructor(props){
    super(props)
    
    this.state={

    }  
  }

  
  
  render() {


    return (
	    <div>
	    <div>
     <div className="startWrap">
		   <div className="leftCol">
		     <h1 className="logo">sliddit. BETA</h1>
		     
		   </div>
	       <div className="rightCol" style={{opacity: 0.5, fontSize: '80%'}}>
	        
	       <p><Icon type="arrow-up" />for category shuffle 
	      <br></br><Icon type="arrow-right" />switch post</p>

		   </div>
		   <div>
			    <p style={{marginBottom: '1%'}}>Autoplay Video</p>
			    <Switch checkedChildren="OFF" unCheckedChildren="ON" 
			    style={{backgroundColor: this.props.autoplay===true?'green':'red', 
			    color: 'white', minWidth: '50%'
			    }} onClick={this.props.autoplayPress} value={this.props.autoplay}>
			    </Switch>
		    </div>
 		   
		</div>
	    </div>
	      <div className="startWrap">
		      
		      <div className="leftCol">
		      <Button className="NSFW" onClick={e=>this.props.categorySet(e.target.value)} value="NSFW">
		          Random NSFW
		        </Button>
		       <Button className="randomCat" onClick={e=>this.props.categorySet(e.target.value)} value="NORMAL">
		          Random Subreddit (SFW)
		        </Button>
		        
		      </div>
		      <div className="rightCol">
		       <Button className="OTHER1" onClick={e=>this.props.categorySet(e.target.value)} value="NSFW">
		          OTHERCAT1
		        </Button>
		        <Button className="OTHER2" onClick={e=>this.props.categorySet(e.target.value)} value="NSFW">
		          OTHERCAT2
		        </Button>
		      </div>
		       
	       </div>
	        
	       <div> 

	      
	      

	        
	      	</div>
	      

	    </div>
    );
  }
}

export default Startpage;




 