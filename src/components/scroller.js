import React, { Component } from 'react'
import Slider from 'react-slick'
import Swipeable from 'react-swipeable'
import 'antd/dist/antd.css';
import { Icon } from 'antd';
import {subredditArray, secondTheme, randomsecondTheme} from '../subreddits'
import logo from '../logo.svg'
import '../App.css'
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';


// import ArrowKeysReact from 'arrow-keys-react';

 
const styles = {
  loaderIcon:{
    fontSize: '40px', 
    color: 'green', 
    zIndex: 1,
    position: 'absolute',
    top: '50%',
    left:'50%'

  },
  iconDown:{
    fontSize:'40px',
    position: 'absolute',
    margin: 'auto',
    zIndex: 1,
    color: 'white',
    left: '50%',
    bottom: 1,

  },
  iconUp:{
    fontSize: '40px',
    position: 'absolute',
    margin: 'auto',
    zIndex: 1,
    color: 'white',
    left: '50%',
    top: 1,

  },
  iconLeft:{
    fontSize: '40px',
    position: 'absolute',
    margin: 'auto',
    zIndex: 1,
    color: 'white',
    left: 1,
    top: '50%',

  },
  iconRight:{
    fontSize: '40px',
    position: 'absolute',
    margin: 'auto',
    zIndex: 1,
    color: 'white',
    right: 1,
    top: '50%',

  },
  icon:{
    fontSize: '40px',
    position: 'absolute',
    margin: 'auto',
    zIndex: 1,
    color: 'white',
    opacity: '0.4'

  },

  titlesLeft:{
  	fontSize: '40px',
    position: 'absolute',
    margin: 'auto',
    zIndex: 1,
    color: 'white',
    opacity: '0.4',
    left: '0%',
    top: '10%',
  },
  titlesRight:{
  	fontSize: '15px',
    position: 'absolute',
    margin: 'auto',
    zIndex: 1,
    color: 'white',
    opacity: '0.4',
    left: '0%',
    top: '5%',
  },
  slider: {

  },

    imgContainerSmall:{
    maxHeight: '100%',
    width: 'auto',
    margin: 'auto',
    
  },

  imgDiv:{
    
    backgroundColor:'blue',
    height: '100%',
    maxWidth: '100%',
  },
  imgContainer:{
    height: '100%',
    maxHeight: '100%',
    width: 'auto',
    margin: 'auto',
    
  },

  videoDiv:{

    backgroundColor:'blue',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%'

  },

  videoContainer:{
    height: '100%',
    maxHeight: '100%',
    maxWidth: '100%',
    margin: 'auto',
    
  },

  wrapper: {
    height: '100%',
    width: '100%'
  },
  red: {
    color: 'red',
  },
}

class Scroller extends Component {
  constructor(props){
    super(props)

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.swipedUp = this.swipedUp.bind(this)
    this.swipedDown = this.swipedDown.bind(this)
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.goto = this.goto.bind(this)
    
    this.state={
      sliderData: [],
      subreddit: '',
      activeSlide:0,
      activeSlide2:0,
      
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
  getSubreddit(subreddit){
    console.log(subreddit)
    this.setState({subreddit: subreddit})
      fetch(`https://www.reddit.com/r/${subreddit}.json?limit=100`)
      .then(response => response.json())
      .then((jsonData) =>{ 
          let datavar=jsonData.data.children.map((testData,i)=>{

            if(testData.data.post_hint==="link"&&testData.data.preview.reddit_video_preview)   {
              return(
                <div style={styles.videoDiv} key={i}>
                  <Video autoPlay={this.props.autoplay} poster={this.imageParser(testData.data.preview.images[0].resolutions[1].url)} preload="none" controls={[]} loop className="video" >
                    <source type="video/mp4" src={testData.data.preview.reddit_video_preview.scrubber_media_url}/>
                    <p>Your browser doesn't support HTML5 video. Here is a <a href={testData.data.preview.reddit_video_preview.scrubber_media_url}>link to the video</a> instead.</p>
                  </Video>
                 </div>
              )
 
            }

            if(testData.data.post_hint==="rich:video"&&testData.data.preview.reddit_video_preview)   {
              return(
                <div style={styles.videoDiv} key={i}>
                  <Video autoPlay={this.props.autoplay} poster={testData.data.thumbnail} preload="none" className="video" loop controls={[]}>
                    <source type="video/mp4" src={testData.data.preview.reddit_video_preview.scrubber_media_url}/>
                    <p>Your browser doesn't support HTML5 video. Here is a <a href={testData.data.preview.reddit_video_preview.scrubber_media_url}>link to the video</a> instead.</p>
                  </Video>
                 </div>
              )

            }
            if(testData.data.post_hint==="hosted:video"&&testData.data.preview.reddit_video_preview)   {
              return(
                <div style={styles.videoDiv} key={i}>
                  <Video autoPlay={this.props.autoplay} poster={testData.data.thumbnail} preload="none" className="video" loop controls={[]}>
                    <source type="video/mp4" src={testData.data.preview.reddit_video_preview.scrubber_media_url}/>
                    <p>Your browser doesn't support HTML5 video. Here is a <a href={testData.data.preview.reddit_video_preview.scrubber_media_url}>link to the video</a> instead.</p>
                  </Video>
                 </div>
              )

            }

            if(testData.data.post_hint==="image"&&testData.data.preview.reddit_video_preview)   {
             
              return(
                <div style={styles.videoDiv} key={i}>
                  <Video autoPlay={this.props.autoplay} poster={this.imageParser(testData.data.preview.images[0].resolutions[1].url)} preload="none"  loop  controls={[]} className="video">
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
                  <div style={styles.imgDiv} key={i}>
                    <img style={styles.imgContainerSmall} src={this.imageParser(testData.data.preview.images[0].source.url)} alt={logo}/>
                   </div>
                 )
               }

              if (testData.data.preview.images[0].resolutions[3]&&sizeRatio>1500){
                return (
                  <div style={styles.imgDiv} key={i}>

                    <img className="image" src={this.imageParser(testData.data.preview.images[0].resolutions[3].url)} alt={logo}/>
                   </div>
                 )
               }
                        
              if (testData.data.preview.images[0].resolutions[4]&&sizeRatio<1500){
                return (
                  <div style={styles.imgDiv} key={i}>
                    <img className="image" src={this.imageParser(testData.data.preview.images[0].resolutions[4].url)} alt={logo}/>
                  </div>
                )
              }
            }
                
        })
      
          this.setState({sliderData: datavar})
      })
      .catch(error=> console.log('parsing error', error)) 
  }

  dataHandler(props){
  	if(props==='DontClickHere'){
  		return(randomsecondTheme)
  	}
  	if(props==='NSFW'){
  		return(secondTheme)
  	}
  	if(props==='normal'){
  		return(subredditArray)
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

//Handling keypresses
  handleKeyDown(e) {
    console.log(e.key)
     if(e.key==='ArrowUp'){
      this.goto()
      this.setState({sliderData: []})
      this.getSubreddit(this.shuffleArray(this.dataHandler(this.props.category))) 
     }
     if(e.key==='w'){
      this.goto()
      this.setState({sliderData: []})
      this.getSubreddit(this.shuffleArray(this.dataHandler(this.props.category))) 
     }
     if(e.key==='ArrowDown'){
      
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


 
  swipedUp(e, deltaY, isFlick) {
    console.log("You Swiped Up...", e, deltaY, isFlick)
    this.goto(0)
      this.setState({sliderData: []})
      this.getSubreddit(this.shuffleArray(this.dataHandler(this.props.category))) 
  }
  swipedDown(e, deltaY, isFlick) {
    console.log("You Swiped Down...", e, deltaY, isFlick)
    this.goto(0)
      this.setState({sliderData: []})
      this.getSubreddit(this.shuffleArray(this.dataHandler(this.props.category))) 
  }


  shuffleArray(array) {
     let random = Math.floor(Math.random() * array.length);
     return array[random]  
  }
  render() {
  	console.log(this.state.activeSlide)
  	console.log(this.state.activeSlide2)
  let settings = {
   lazyLoad: "ondemand",
   speed: 0,
   arrows: false,
   infinite: false,
   slidesToShow: 1,
   slidesToScroll: 1,
   accessibility:false,
   initialSlide: 0,
   
    
 }
  console.log(this.state.sliderData)

    return (
    
      <div onKeyDown={ this.handleKeyDown }style={styles.wrapper} >
        
      	<h2 style={styles.titlesLeft}>{this.state.subreddit}</h2>
        <h3 style={styles.titlesRight}>{this.props.category}</h3>

        <Icon onClick={()=>this.props.categorySet('nothing')} style={styles.icon} type="retweet" />
         
        <Icon style={styles.iconUp} type="up"/>
        
        <Icon style={styles.iconDown} type="down"/>
        
        <Icon onClick={this.goto} style={styles.iconRight} type="right"/>
        
        <Icon onClick={this.previous} style={styles.iconLeft} type="left"/>

        {this.state.sliderData.length === 0 && <div style={styles.loaderIcon}><Icon type="loading" /></div>}

        <Swipeable
        onSwipingDown={this.swipedDown}
        onSwipedUp={this.swipedUp} >

        
          <Slider  ref={c => this.slider = c } {...settings}>
			<button autoFocus>{this.state.subreddit}</button>
			{this.state.sliderData}
           

          </Slider>
        </Swipeable>

      </div>

    
    );
  }
}

export default Scroller;




 