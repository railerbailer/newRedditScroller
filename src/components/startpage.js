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
	   
	      <div className="startWrap">

		      <div className="leftCol">
			      <div className="">
				      <h1 className="logo">sliddit. BETA</h1>
				  </div>
			      <Button className="NSFW" onClick={e=>this.props.categorySet(e.target.value)} value="NSFW">
			          NSFW
			        </Button>
			       <Button className="randomCat" onClick={e=>this.props.categorySet(e.target.value)} value="Normal">
			          All sfw
			        </Button>
			      </div>
			   <div className="rightCol">
			       <Button className="OTHER1" onClick={e=>this.props.categorySet(e.target.value)} value="Art">
			          Art
			        </Button>
			        <Button className="OTHER2" onClick={e=>this.props.categorySet(e.target.value)} value="Food">
			          Food
			        </Button>
		      </div>
	       </div>
	       <div> 
				<Switch checkedChildren="Autoplay:OFF" unCheckedChildren="Autoplay:ON" 
					    style={{backgroundColor: this.props.autoplay===true?'green':'red', 
					    color: 'white', width: '10%'
					    }} onClick={this.props.autoplayPress} value={this.props.autoplay}>
				</Switch>
	      	</div>
	    </div>
    );
  }
}

export default Startpage;




 