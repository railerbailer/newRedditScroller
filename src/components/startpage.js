import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Icon, Button, Switch } from 'antd';
import {subredditArray, secondTheme} from '../subreddits'
import logo from '../logo.svg'
import '../App.css'

// import ArrowKeysReact from 'arrow-keys-react';

const styles = {
	randomCat: {
		marginTop: '1%',
		height: '50px',
      	backgroundColor: 'white',
      	color: 'black'
    },
    NSFW: {
    	marginTop: '1%',
    	height: '50px',
    	color: 'white',
      	backgroundColor: '#1bb76e',

    },
    GIFS: {
    	marginTop: '1%',
    	height: '50px',
      	backgroundColor: 'red',
      	color: 'white',
    },
    startWrap:{
    	display: 'flex',
    	flexDirection: 'column',
    	margin: 'auto',
    	width: '50%'
    	

    },

    
}

class Startpage extends Component {
  constructor(props){
    super(props)
    
    this.state={

    }  
  }

  
  
  render() {


    return (
	    <div>
	    <h1 className="logo">sliddit. BETA</h1>
	      <div style={styles.startWrap}>
	      <p>Press up to switch category<Icon type="arrow-up" /></p>
	      <p>Press to the side to switch post<Icon type="arrow-right" /></p>
	      <h2 style={{color: 'white'}}> Select category </h2>
	        <Button style={styles.randomCat} onClick={e=>this.props.categorySet(e.target.value)} value="NORMAL">
	          Random Subreddit (SFW)
	        </Button>
	        <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="NSFW">
	          RANDOM NSFW
	        </Button>
	        <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="amateurNSFW">
	          amateurNSFW
	        </Button>
	        <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="collegeNSFW">
	          collegeNSFW
	        </Button>
	        <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="gonewildNSFW">
	          gonewildNSFW
	        </Button>
	        <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="selfieNSFW">
	          selfieNSFW
	        </Button>
	        <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="analNSFW">
	          analNSFW
	        </Button>
	        <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="buttplugNSFW">
	          buttplugNSFW
	        </Button>
	        <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="assNSFW">
	          assNSFW
	        </Button>
	        <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="athleticNSFW">
	          athleticNSFW
	        </Button>
	        <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="fatNSFW">
	          fatNSFW
	        </Button>
	        <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="bigdickNSFW">
	          bigdickNSFW
	        </Button>
	         <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="bimboNSFW">
	          bimboNSFW
	        </Button>
	         <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="bimboNSFW">
	          bimboNSFW
	        </Button>
	         <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="titfuckNSFW">
	          titfuckNSFW
	        </Button>
	         <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="sexyclothingNSFW">
	          sexyclothingNSFW
	        </Button>
	         <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="pornnetworksNSFW">
	          pornnetworksNSFW
	        </Button>
	         <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="cumNSFW">
	          cumNSFW
	        </Button>
	        <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="asianNSFW">
	          asianNSFW
	        </Button>
	        <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="blackNSFW">
	          blackNSFW
	        </Button>
	        <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="indianNSFW">
	          indianNSFW
	        </Button>
	        <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="bdsmNSFW">
	          bdsmNSFW
	        </Button>
	        <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="cuckoldNSFW">
	          cuckoldNSFW
	        </Button>
	        <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="tattooNSFW">
	          tattooNSFW
	        </Button>
	        <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="alternativeNSFW">
	          alternativeNSFW
	        </Button>
	        <Button style={styles.NSFW} onClick={e=>this.props.categorySet(e.target.value)} value="otherNSFW">
	          otherNSFW
	        </Button>

	        
	        <p style={{color: 'white', marginTop: '10%', marginBottom: '-1%'}}>Autoplay Video</p>
		    <Switch checkedChildren="OFF" unCheckedChildren="ON" 
		    style={{backgroundColor: this.props.autoplay===true?'green':'red', 
		    color: 'white', width: '30%'
		    }} onClick={this.props.autoplayPress} value={this.props.autoplay}>
		    </Switch>
	      </div>
	    </div>
    );
  }
}

export default Startpage;




 