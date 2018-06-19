import React, { Component } from 'react'
import Slider from 'react-slick'
import Swipeable from 'react-swipeable'
import 'antd/dist/antd.css';
import { Icon, Button } from 'antd';
import videoConnect from 'react-html5video';
import {subredditArray, NSFW, artArray, foodArray } from '../subreddits'
import logo from '../logo.svg'
import '../App.css'
import { DefaultPlayer as Video, togglePause, PlayPause } from 'react-html5video';
import 'react-html5video/dist/styles.css';


// import ArrowKeysReact from 'arrow-keys-react';


 
class Scroller extends Component {
  constructor(props){
    super(props)

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.swipedUp = this.swipedUp.bind(this)
    this.swipedDown = this.swipedDown.bind(this)
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.goto = this.goto.bind(this)
    this.pressUpOrDown = this.pressUpOrDown.bind(this)
    

    
    this.state={
      sliderData: [],
      subreddit: '',
      activeSlide:0,
      activeSlide2:0,
      looper: false
      
    }  
  }


  // what do you want to swoapp? 
  // If nsfw chosen, ask for age, if age is 18+, load the const into getSubReddit()
  // otherwise just load load the const into getSubReddit()
  // add wdas and space to play
  // add back button and back
  //change home button to switch icon
  


  componentDidMount(){

    this.getSubreddit(this.shuffleArray(this.dataHandler(this.props.category))) 
  }
  

  dataHandler(props){
  	if(props==='NSFW'){
  		return(NSFW)
  	}
  	if(props==='NORMAL'){
  		return(subredditArray)
  	}
  	if(props==='Art'){
  		return(artArray)
  	}
  	if(props==='Food'){
  		return(foodArray)
  	}

  	else{
  		return(subredditArray)
  	}
  }
  
  imageParser(url){
     let editedUrl = url.replace(/&amp;/g,  "&")
     return (editedUrl)
  }

//Slider methods

  next() {
    this.slider.slickNext()
  }
  previous() {
    this.slider.slickPrev()
  }

  focus(){
  	this.slider.focus()
  }

  goto(){
    this.slider.slickGoTo(0)
  }

//checks for file type
  checkGif(url){
    return(url.match(/\.(gif)$/) != null);
  }
  checkImg(url){
    return(url.match(/\.(jpeg|jpg|png)$/) != null);
  }

  pressUpOrDown(){
  	this.goto()
    this.setState({sliderData: []})
    this.getSubreddit(this.shuffleArray(this.dataHandler(this.props.category))) 
  }
//Handling keypresses
  handleKeyDown(e) {
    
     if(e.key==='ArrowUp'){
      this.switchCat()
     }
     if(e.key==='w'){
      this.switchCat()
     }
     if(e.key==='ArrowDown'){
      this.switchCat()
     }

     if(e.key==='s'){
      this.switchCat()
     
     }
    

     if(e.key==='ArrowLeft'){
      this.previous()
     }
     if(e.key==='ArrowRight'){
      this.next()
     }
     if(e.key==='a'){
      this.previous()
     }
     if(e.key==='d'){
      this.next()
     }
  }


 switchCat(){
 	this.goto(0)
          this.setState({sliderData: []})
          this.getSubreddit(this.shuffleArray(this.dataHandler(this.props.category)))
 }
  swipedUp(e, deltaY, isFlick) {
    console.log("You Swiped Up...", e, deltaY, isFlick)
    if(isFlick===true){
          this.switchCat()
     } 
  }
  swipedDown(e, deltaY, isFlick) {
  	if(isFlick===true){
    	this.switchCat()
     }
  }


  shuffleArray(array) {
     let random = Math.floor(Math.random() * array.length);
     return array[random]  
  }

 


  render() {
  	
  	console.log(this.state.looper)

  let settings = {
  swipeToSlide: false,
   lazyLoad: true,
   speed: 0,
   arrows: false,
   infinite: false,
   slidesToShow: 1,
   speed: 600,
   slidesToScroll: 1,
   accessibility:false,
   initialSlide: 0,

   
    
 }
  // <Button style={{backgroundColor: this.props.autoplay===true?'green':'red', color: 'white', position: 'absolute', opacity: '0.4', right: 5}} onClick={this.props.autoplayPress} value={this.props.autoplay}>
	//          Autoplay: {this.props.autoplay===true?'ON':'OFF'}
	  //      </Button>
  // console.log(this.state.sliderData)

    return (
    
      <div onKeyDown={ this.handleKeyDown }className="wrapper">

    
        <div className="switchTitle">
        	<Icon onClick={()=>this.props.categorySet('nothing')} className="iconBack" type="rollback" />
         	
         </div>
         <div className="iconSetting">
          <Icon onClick={()=>this.props.categorySet('nothing')} type="setting" />
          <div className="titlesRight">
          <h3 style={{color: 'white', fontSize: '40%'}}><Icon type="tag-o"/>{this.props.category}</h3>
          </div>
         </div>
        <Icon onClick={this.pressUpOrDown}className="iconUp" type="up"/>
        
        <Icon onClick={this.next} style={styles.iconRight} type="right"/>
        
        <Icon onClick={this.previous} style={styles.iconLeft} type="left"/>
        <div className="downDiv">
            <h2 className="titlesLeft">{this.state.subreddit}
            
            </h2>
                <Icon onClick={this.pressUpOrDown} className="iconDown" type="down"/>
          </div>

        {this.state.sliderData.length === 0 && <div className="loaderIcon"><Icon type="loading" /></div>}

        <Swipeable
        onSwipedDown={this.swipedDown}
        onSwipedUp={this.swipedUp} 
        >

          <Slider  ref={c => this.slider = c } {...settings}>

			<button className="starterButton" autoFocus>
				<h2 className="subRedditTitle">{this.state.subreddit}</h2>
			</button>
			{this.state.sliderData}

          </Slider>
          
        </Swipeable>
      
      					
      </div>

    
    );
  }

  getSubreddit(subreddit){
  
    console.log(subreddit)
    this.setState({subreddit: subreddit})
      fetch(`https://www.reddit.com/r/${subreddit}.json?limit=100`)
      .then(response => response.json())
      .then((jsonData) =>{ 
          let datavar=jsonData.data.children.map((testData,i)=>{

            if(testData.data.post_hint==="link"&&testData.data.preview.reddit_video_preview)   {
              return(
                <div ref={this.videoPlayer} className="videoDiv" key={i}>
                  <Video  autoPlay={this.props.autoplay} poster={this.imageParser(testData.data.preview.images[0].resolutions[1].url)} preload="none" controls={[]} loop={this.state.looper} className="video" >
					<source src={this.imageParser(testData.data.preview.images[0].resolutions[1].url)}/>
                    <source type="video/mp4" src={testData.data.preview.reddit_video_preview.scrubber_media_url}/>
                    <p>Your browser doesn't support HTML5 video. Here is a <a href={testData.data.preview.reddit_video_preview.scrubber_media_url}>link to the video</a> instead.</p>
                  </Video>
                 </div>
              )
 
            }

            if(testData.data.post_hint==="rich:video"&&testData.data.preview.reddit_video_preview)   {
              return(
                <div ref={this.videoPlayer} className="videoDiv" key={i}>
                  <Video  autoPlay={this.props.autoplay} poster={testData.data.thumbnail} preload="none" className="video" loop={this.state.looper} controls={[]}>
                    <source src={testData.data.thumbnail}/>
                    <source type="video/mp4" src={testData.data.preview.reddit_video_preview.scrubber_media_url}/>
                    <p>Your browser doesn't support HTML5 video. Here is a <a href={testData.data.preview.reddit_video_preview.scrubber_media_url}>link to the video</a> instead.</p>
                  </Video>
                 </div>
              )

            }
            if(testData.data.post_hint==="hosted:video"&&testData.data.preview.reddit_video_preview)   {
              return(
                <div ref={this.videoPlayer} className="videoDiv" key={i}>
                  <Video  autoPlay={this.props.autoplay} poster={testData.data.thumbnail} preload="none" className="video" loop={this.state.looper} controls={[]}>
                                        <source src={testData.data.thumbnail}/>

                    <source type="video/mp4" src={testData.data.preview.reddit_video_preview.scrubber_media_url}/>
                    <p>Your browser doesn't support HTML5 video. Here is a <a href={testData.data.preview.reddit_video_preview.scrubber_media_url}>link to the video</a> instead.</p>
                  </Video>
                 </div>
              )

            }

            if(testData.data.post_hint==="image"&&testData.data.preview.reddit_video_preview)   {
             
              return(
                <div ref={this.videoPlayer} className="videoDiv" key={i}>
                  <Video  autoPlay={this.props.autoplay} poster={this.imageParser(testData.data.preview.images[0].resolutions[1].url)} preload="none"  loop={this.state.looper} controls={[]} className="video">
					<source src={this.imageParser(testData.data.preview.images[0].resolutions[1].url)}/>
  
                    <source type="video/mp4" src={testData.data.preview.reddit_video_preview.scrubber_media_url}/>
                    <p>Your browser doesn't support HTML5 video. Here is a <a href={testData.data.preview.reddit_video_preview.scrubber_media_url}>link to the video</a> instead.</p>
                  </Video>
                </div>
              )

            }            

            if(testData.data.post_hint==="image"){
              let sizeRatio= testData.data.preview.images[0].source.height+testData.data.preview.images[0].source.width
              
              if (testData.data.preview.images[0].source.height<300){
                return (
                  <div className="imgDiv" key={i}>
                    <img className="image" src={this.imageParser(testData.data.preview.images[0].source.url)} alt="{logo}"/>
                   </div>
                 )
               }

              if (testData.data.preview.images[0].resolutions[3]&&sizeRatio>1500){
                return (
                  <div className="imgDiv" key={i}>

                    <img className="image" src={this.imageParser(testData.data.preview.images[0].resolutions[3].url)} alt="{logo}"/>
                   </div>
                 )
               }
                        
              if (testData.data.preview.images[0].resolutions[4]&&sizeRatio<1500){
                return (
                  <div className="imgDiv" key={i}>
                    <img className="image" src={this.imageParser(testData.data.preview.images[0].resolutions[4].url)} alt="{logo}"/>
                  </div>
                )
              }
            }
                
        })
      
          this.setState({sliderData: datavar})
      })
      .catch(error=> console.log('parsing error', error)) 
  }
}

export default Scroller;

const styles = {
   iconLeft:{
    opacity: 0.4,
    width: '10%',
    position: 'absolute',
    margin: 'auto',
    zIndex: 1,
    color: 'white',
    left: 1,
    top: '50%',
    textAlign: 'left',
    height: '50%',


  },
  iconRight:{
    opacity: 0.4,
    
    position: 'absolute',
    margin: 'auto',
    zIndex: 1,
    color: 'white',
    right: 1,
    top: '50%',
    textAlign: 'right',
    height: '50%',
    width: '10%',

  },
};


 //        <p className="instructionRight}>"A/D" or "Left/Right Arrow" to show next</p>

	// 			<div className="instructionDown}>"W/S" or "Up/Down Arrow" to switch subreddit</div>

 // 