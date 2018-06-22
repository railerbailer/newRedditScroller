import React, { Component } from 'react'
import Slider from 'react-slick'
import Swipeable from 'react-swipeable'
import 'antd/dist/antd.css';
import { Icon, Button, Popover } from 'antd';
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
    this.swipedLeft = this.swipedLeft.bind(this)
    this.swipedRight = this.swipedRight.bind(this)
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.goto = this.goto.bind(this)
    this.pressUpOrDown = this.pressUpOrDown.bind(this)
    this.switchCat = this.switchCat.bind(this)
    

    
    this.state={
      sliderData: [],
      subreddit: '',
      activeSlide:0,
      activeSlide2:0,
      looper: false,
      visibleUp: true,
      visibleSide: true,
      visibleBackLeft: false,
      alreadyChecked: false
      
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
    this.setState({visibleSide: false})
    if(this.state.visibleSide===false){
      this.slider.slickNext()
      
      console.log(this.state.alreadyChecked)
      if(this.state.alreadyChecked===false){
        this.setState({visibleBackLeft: true, alreadyChecked: true})
        
      }
    }
  }
  previous() {
    this.setState({visibleBackLeft: false})
    if(this.state.visibleBackLeft===false&&this.state.visibleSide===false){
      this.slider.slickPrev()
    }
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
    this.setState({visibleUp: !this.state.visibleUp})
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
  this.setState({visibleUp: false})
  
  if(this.state.visibleUp===false){
 	this.goto(0)
  this.setState({sliderData: []})
  this.getSubreddit(this.shuffleArray(this.dataHandler(this.props.category)))
  }

 }
  
  swipedLeft(e, absX, isFlick) {
    if(isFlick||absX>30){
      this.next()

    }
    console.log("You're Swiping to the Left...", absX)
  }

  swipedRight(e, absX, isFlick) {
    if(isFlick){
      this.previous()
    }
    console.log("You're Swiping to the Right...", absX , e)
  }

  swipedUp(e, deltaY, isFlick) {
    console.log("You Swiped Up...", e, deltaY, isFlick)
    if(isFlick){
          this.switchCat()
     } 
  }
  swipedDown(e, deltaY, isFlick) {
  	if(isFlick){
    	this.switchCat()
     }
  }


  shuffleArray(array) {
     let random = Math.floor(Math.random() * array.length);
     return array[random]  
  }

 


  render() {
  	
    console.log(this.state.sliderData)
const SwitchCategoryContent = (
  <div >
    <p style={{color: 'black'}}>Click S / Down Arrow / Swipe or
    <br/>click here to switch subreddit</p>
  </div>
);

const NextPostContent = (
  <div >
    <p style={{color: 'black'}}>Swipe / Click D / Right arrow or 
    <br/>click here to go to the next post</p>
  </div>
);

  let settings = {
  swipeToSlide: 'false',
   lazyLoad: 'ondemand',
   arrows: false,
   infinite: false,
   slidesToShow: 1,
   speed: 100,
   slidesToScroll: 1,
   accessibility:false,
   initialSlide: 0,

   
    
 }
  // <Button style={{backgroundColor: this.props.autoplay===true?'green':'red', color: 'white', position: 'absolute', opacity: '0.4', right: 5}} onClick={this.props.autoplayPress} value={this.props.autoplay}>
	//          Autoplay: {this.props.autoplay===true?'ON':'OFF'}
	  //      </Button>
  // console.log(this.state.sliderData)
console.log(this.state.visible)
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
        <Icon onClick={this.switchCat}
        className="iconUp" type="up">
        </Icon>
       
      <Popover visible={this.state.visibleSide}  placement="right" title="Show next post" content={NextPostContent} trigger="click">
        <Icon onClick={this.next} 
        style={styles.iconRight} type="right"/>
      </Popover>  
        <Icon onClick={this.previous} style={styles.iconLeft} type="left"/>
      <Icon type="close" />
        <div className="downDiv">
          <h2 className="titlesLeft">{this.state.subreddit}</h2>
        <Popover visible={this.state.visibleUp}  placement="bottom" title="Switch category" content={SwitchCategoryContent}>
          <Icon onClick={this.switchCat} className="iconDown" type="down"/>
        </Popover>
        </div>
        <Swipeable
          onSwipedDown={this.swipedDown}
          onSwipedUp={this.swipedUp} 
          onSwipedLeft={this.swipedLeft}
          onSwipedRight={this.swipedRight}
        >
          <Slider ref={c => this.slider = c } {...settings}>
    			  <button className="starterButton" autoFocus>
      			
              {this.state.sliderData.length === 0?<div className="subRedditTitle">Finding subreddit...<Icon type="loading" /></div>: <h2 className="subRedditTitle">{this.state.subreddit}</h2>}
        	 </button>
        		 {this.state.sliderData}
          </Slider>
        </Swipeable>				
      </div>
    );
  }

  getSubreddit(subreddit){
  
    // console.log(subreddit)
    this.setState({subreddit: subreddit})
      fetch(`https://www.reddit.com/r/${subreddit}.json?limit=100`)
      .then(response => response.json())
      .then((jsonData) =>{ 
          let datavar=jsonData.data.children.map((testData,i)=>{

            if(testData.data.post_hint==="link"&&testData.data.preview.reddit_video_preview)   {
              
              return(
                <div ref={this.videoPlayer} className="videoDiv" key={i}>
                  <Video  autoPlay={this.props.autoplay} poster={this.imageParser(testData.data.preview.images[0].resolutions[1].url)} preload="metaData" controls={[]} loop={testData.data.preview.reddit_video_preview.duration<5?true:false} className="video" >
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
                  <Video  autoPlay={this.props.autoplay} poster={testData.data.thumbnail} preload="metaData" className="video" loop={testData.data.preview.reddit_video_preview.duration<5?true:false} controls={[]}>
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
                  <Video  autoPlay={this.props.autoplay} poster={testData.data.thumbnail} preload="metaData" className="video" loop={testData.data.preview.reddit_video_preview.duration<5?true:false} controls={[]}>
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
                  <Video  autoPlay={this.props.autoplay} poster={this.imageParser(testData.data.preview.images[0].resolutions[1].url)} preload="metaData"  loop={testData.data.preview.reddit_video_preview.duration<5?true:false} controls={[]} className="video">
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
    position: 'absolute',
    margin: 'auto',
    zIndex: 1,
    color: 'white',
    left: 1,
    top: '45%',
    textAlign: 'left',
    


  },
  iconRight:{
    opacity: 0.4,
    
    position: 'absolute',
    margin: 'auto',
    zIndex: 1,
    color: 'white',
    right: 1,
    top: '45%',
    textAlign: 'right',
    

  },
};


 //        <p className="instructionRight}>"A/D" or "Left/Right Arrow" to show next</p>

	// 			<div className="instructionDown}>"W/S" or "Up/Down Arrow" to switch subreddit</div>

 // 