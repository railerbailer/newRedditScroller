import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Icon, Button, Switch, message, Popconfirm } from 'antd';
import {subredditArray, secondTheme} from '../subreddits'
import logo from '../logo.svg'
import '../App.css'
import {Route, Link } from 'react-router-dom'


// import ArrowKeysReact from 'arrow-keys-react';

const text = 'Are you sure delete this task?';



class Startpage extends Component {
  constructor(props){
    super(props)
    




    this.state={
    	

    }  
  }


confirm() {
  message.info('Clicked on Yes.');
}

  
  render() {

//					<Popconfirm placement="top" title={text} onConfirm={this.confirm} okText="Yes" cancelText="No">



    return (
	    <div className="wrapperRow">
	   
	      <div className="startWrap">

		      <div className="leftCol">
			      <div className="logoTexts">
				      <h1 className="logo">sliddit. BETA</h1>
				      <p className="sloganText">Scroll millions of<br/>gifs, videos & pics</p>
				  </div>

				   
					<Link to="/scroll">
      
        
	  				    <Button className="NSFW" onClick={e=>this.props.categorySet(e.target.value)} value="NSFW">
					        NSFW
					    </Button>
				    </Link>
				    <Link to="/scroll">  
			       <Button className="randomCat" onClick={e=>this.props.categorySet(e.target.value)} value="Normal">
			          SFW
			        </Button>
			        </Link>
			      </div>
			   <div className="rightCol">
				   <Link to="/scroll">
				       <Button className="OTHER1" onClick={e=>this.props.categorySet(e.target.value)} value="Art"> 
				       ART
				        </Button>
				    </Link>
				    <Link to="/scroll">
				        <Button className="OTHER2" onClick={e=>this.props.categorySet(e.target.value)} value="Food">
				          FOOD
				        </Button>
			        </Link>
			        <Link to="/scroll">
				        <Button className="OTHER3" onClick={e=>this.props.categorySet(e.target.value)} value="Animals">
				          ANIMALS
				        </Button>
			        </Link>
		      </div>
	       </div>
	       <div className="footerDiv"> 
				<Switch checkedChildren="Autoplay video: ON" unCheckedChildren="Autoplay video: OFF" 
					    style={{fontSize: '1vw !important', backgroundColor: this.props.autoplay===true?'green':'red', 
					    color: 'white'
					    }} onClick={this.props.autoplayPress} value={this.props.autoplay}>
				</Switch>
				<div>
					<h3>Instructions and usage</h3>
					<p>To use sliddit.com you can either swipe, use the keyboard arrow keys, W/A/S/D keyboard buttons or click the arrows in the user interface.  </p>
					<p>You can as a user either shuffle by pressing "right" between the different subreddits within your chosen category or go to the next/previous picture/gif/video by scrolling downwards or upwards. 
					If you want to go back to a previous subreddit you scrolled you can just go back by going "left" </p> 
					<h3>About sliddit.com</h3>
					<p>The site for scrolling millions of pictures, gifs and videos that are acquired from different subreddits through the reddit API. Reddit is a forum which gives the user the possibility
					to scroll through posts, but not for pictures and videos / gifs specificly. Therefore this site was created
					to give the user the ability to fast scroll through different subreddits and find the pictures, videos and gifs that are hidden
					within the posts. This website is inspired from the website Nuttit which was shut down about a year ago. We are always
					looking to improve and would love any critizism that you can give. 
					</p>
				</div>

	      	</div>
	    </div>
    );
  }
}

export default Startpage;




 