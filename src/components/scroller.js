import React, { Component } from 'react'
import Slider from 'react-slick'
import Swipeable from 'react-swipeable'
import 'antd/dist/antd.css';
import { Icon, Button, Popover, Spin, Popconfirm, message, notification, Modal, Alert, Tooltip, Menu, Dropdown } from 'antd';
import videoConnect from 'react-html5video';
import {nsfwAll, subredditArray, NSFW, artArray, foodArray, animalsArray } from '../subreddits'
import logo from '../logo.svg'
import '../App.css'
import { DefaultPlayer as Video, togglePause, PlayPause } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import {Route, Link } from 'react-router-dom'


let onCancel = 0
let goBack = []
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
    this.switchCat = this.switchCat.bind(this)
    this.goBackToLast=this.goBackToLast.bind(this)
    this.changeVisible=this.changeVisible.bind(this)
    this.imageParser=this.imageParser.bind(this)
    this.changeCat=this.changeCat.bind(this)

    this.state={
      sliderData: [],
      subreddit: '',
      activeSlide:0,
      activeSlide2:0,
      looper: false,
      visibleUp: true,
      visibility: true,
      visibleBackLeft: false,
      alreadyChecked: false,
      spinning: true,
      underage: true
      
      
    }  
  }

  componentDidMount(){
    this.openNotification()
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
    if(props==='Animals'){
      return(animalsArray)
    }

  	else{
  		return(subredditArray)
  	}
  }

  //checks for file type
  checkGif(url){
    return(url.match(/\.(gif)$/) != null);
  }
  checkImg(url){
    return(url.match(/\.(jpeg|jpg|png)$/) != null);
  }
  
  imageParser(url){
     let editedUrl=''
     editedUrl = url.replace(/&gt;/gi,  ">").replace(/&lt;/gi,  "<").replace(/&amp;/gi,  "&")
     return (editedUrl)
  }

//Slider methods

  next() {
      this.slider.slickNext()
  }
  previous() {
      this.slider.slickPrev()
  }

  switchCat(){
  this.setState({sliderData: []})
  this.getSubreddit(this.shuffleArray(this.dataHandler(this.props.category)))
 }

  goBackToLast(){
  this.setState({sliderData: []})
    goBack.length>1?
      this.getSubreddit(goBack[goBack.length-2])
    :null
    goBack = goBack.slice(0, goBack.length-2)
 }

  handleKeyDown(e) {
     if(e.key==='ArrowLeft'){
      this.goBackToLast()
     }
     if(e.key==='a'){
      this.goBackToLast()
     }
     if(e.key==='ArrowDown'){
      this.next()
     }

     if(e.key==='s'){
      this.next()
     }
     if(e.key==='w'){
      this.previous()
     }
     if(e.key===' '){
      if(this.videoPlayer.paused){
            this.videoPlayer.play()
      }
      else this.videoPlayer.pause()
     }

     if(e.key==='ArrowUp'){
      this.previous()
     }
     if(e.key==='ArrowRight'){
      this.switchCat()
     }
     if(e.key==='d'){
      this.switchCat() 
     }
  }

  swipedLeft(e, absX, isFlick) {
    if(isFlick||absX>30){
      this.switchCat()
    }
    console.log("You're Swiping to the Left...", absX)
  }

  swipedRight(e, absX, isFlick) {
    if(isFlick||absX>30){
      this.goBackToLast()
    }
    console.log("You're Swiping to the Right...", absX , e)
  }
  swipedUp(e, deltaY, isFlick) {
    console.log("You Swiped Up...", e, deltaY, isFlick)
    if(isFlick){
          this.next()
     } 
  }
  swipedDown(e, deltaY, isFlick) {
  	if(isFlick){
    	this.previous()
     }
  }
  changeVisible(){
    setTimeout(()=>{this.setState({visibility: false})}, 3000)
  }

  shuffleArray(array) {
     let random = Math.floor(Math.random() * array.length);
     return array[random]  
  }

  loadingOrNo(){
    this.state.sliderData.length === 0?
      this.setState({spinning: true})
    :
      this.setState({spinning: false})
    
  }
   changeCat(cat){

    this.props.categorySet(cat)
      message.info(`Switched category to ${cat}, press or swipe right to shuffle subreddit`);
   }
   openNotification(){
    notification.open({
      duration: 3,
      message: 'Note!',
      description: 'Swipe, or use your keyboard arrows or a,s,w,d to shuffle or scroll posts.',
    })
  }


  render() {

let SwitchCategoryContent = (
  <div onClick={this.next}>
    <p style={{color: 'black'}}>Swipe / Click S / Down arrow or 
    <br/>click here to go to the next post</p>
  </div>
);

let NextPostContent = (
  <div onClick={this.switchCat}>
    <p style={{color: 'black'}}>Click D / Right Arrow / Swipe or
    <br/>click here to shuffle to a new subreddit</p>
  </div>
);

const menu = (
  <Menu>
    <Menu.Item >
      <div onClick={()=>this.changeCat('NSFW')} >NSFW</div>
    </Menu.Item>
    <Menu.Item>
          <div onClick={()=>this.changeCat('Normal')} >SFW</div>
    </Menu.Item>
    <Menu.Item>
          <div onClick={()=>this.changeCat('Art')} >ART</div>
    </Menu.Item>
    <Menu.Item>
          <div onClick={()=>this.changeCat('Animals')} >ANIMALS</div>
    </Menu.Item>
    <Menu.Item>
          <div onClick={()=>this.changeCat('Food')} >FOOD</div>
    </Menu.Item>
     <Menu.Divider />
    <Menu.Item disabled>{this.props.category}</Menu.Item>
  </Menu>
);

  let settings = {
  //   vertical: true,
  swipeToSlide: false,
  swipe: false,
  lazyLoad: 'ondemand',
   arrows: false,
   infinite: false,
   speed: 0,
  
  slidesToShow: 1,
  slidesToScroll: 1,
  slidesPerRow: 1,
  
  
  
   
   

   
    
 }
  // <Button style={{backgroundColor: this.props.autoplay===true?'green':'red', color: 'white', position: 'absolute', opacity: '0.4', right: 5}} onClick={this.props.autoplayPress} value={this.props.autoplay}>
	//          Autoplay: {this.props.autoplay===true?'ON':'OFF'}
	  //      </Button>



            //   {this.props.category==="NSFW"?
            //                <Modal visible={this.state.underage} title="NSFW CONTENT!" onOk={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
            //                       Are you over 18?
            //                 </Modal>
            //   :null
            // }

            // <Popover visible={this.state.visibleUp}  placement="right"  content={NextPostContent} trigger="click">
              //</Popover>  

              //<Popover visible={this.state.visibility}  placement="bottom" content={SwitchCategoryContent}>
              //</Popover>

              //            <Icon onClick={()=>this.props.categorySet('nothing')} className="iconBack" type="rollback" />


    return (
      
      
      <Swipeable
      onKeyDown={ this.handleKeyDown }className="wrapper"
          onSwipedDown={this.swipedDown}
          onSwipedUp={this.swipedUp} 
          onSwipedLeft={this.swipedLeft}
          onSwipedRight={this.swipedRight}
        >

               <div className="switchTitle">
        <Tooltip placement="topLeft" title="Back to start" arrowPointAtCenter>

          <Link to='/'>
              <h1 className="scrollLogo">sliddit. BETA</h1>
          </Link>
        </Tooltip>
        </div>
         
          
            <Dropdown overlay={menu} trigger={['click']}>
             
          <Link className="iconSetting" to="#">
            <Tooltip placement="topLeft" title="Click to change category" arrowPointAtCenter>
              
                {this.props.category}
                <Icon type="sync" className="chooseCat"></Icon>
                
              
            </Tooltip>
            </Link>
          
         </Dropdown>
           
      
      <Tooltip placement="topLeft" title="Click, swipe or use Top arrow / 'A' to show last post" arrowPointAtCenter>

        <Icon onClick={this.previous}
        className="iconUp" type="up">
        </Icon>
      </Tooltip>
      
      
     
      <Tooltip placement="topLeft" title="Click, swipe or use Right arrow / 'D' to shuffle subreddits" arrowPointAtCenter>

        <Icon  onClick={this.switchCat} 
        style={styles.iconRight} type="right"/>
      </Tooltip>
      <Tooltip placement="topLeft" title="Click, swipe, use Left arrow or 'A' to go back to last subreddit" arrowPointAtCenter>

        <Icon onClick={this.goBackToLast} style={styles.iconLeft} type="left"/>
      </Tooltip>
      <Icon type="close" />
        <div className="downDiv">
          <h2 className="titlesLeft"><Icon type="tag-o"/>{this.state.subreddit}</h2>
    
      <Tooltip placement="topLeft" title="Click, swipe, use Left arrow or 'A' to go to next post" arrowPointAtCenter>

          <Icon onClick={this.next} className="iconDown" type="down"/>
      </Tooltip>
        </div>
        
          <button className="inputFocus" ref={button => button && button.focus()}/>

          <Slider ref={c => this.slider = c } {...settings}>

              {this.state.sliderData.length === 0?<button className="subRedditTitle"><Spin wrapperClassName="subRedditTitle" size="large"/></button>: this.state.sliderData}
              

              
        		 
          </Slider>
        
        </Swipeable>				
      
    );
  }

  


 getSubreddit(subreddit){
  
    
    this.setState({subreddit: subreddit})
    
    
    console.log(subreddit, goBack)

//Om det blev fel kan det vara annat än url som inte finns...
      fetch(`https://www.reddit.com/r/${subreddit}.json?limit=100`)
      .then(response => response.json())
      .then((jsonData) =>{ 
        
        let zeroNullData=false
          let datavar=jsonData.data.children.map((testData,i)=>{
            
            //    if(testData.data.media_embed.content){
            //     let data=testData.data.media_embed.content
            //     data = this.imageParser(data)
            //     function createMarkup(){
            //       return{__html: data}
            //     }
            //     return (<div className="imgDiv" key={i} dangerouslySetInnerHTML={createMarkup()}></div>)
                
            // }

            if(testData.data.post_hint==="link"&&testData.data.preview.reddit_video_preview)   {
              zeroNullData=true
              return(
                <div className="videoDiv" key={i}>
                  <p className="titleText">{testData.data.title}</p>
                  <video controls  ref={(el)=> this.videoPlayer = el} autoPlay={this.props.autoplay} poster={this.imageParser(testData.data.preview.images[0].resolutions[1].url)} preload="none"  loop={testData.data.preview.reddit_video_preview.duration<5?true:false} className="video" >
                    <source type="video/mp4" src={testData.data.preview.reddit_video_preview.scrubber_media_url}/>
                    <p>Your browser doesn't support HTML5 video. Here is a <a href={testData.data.preview.reddit_video_preview.scrubber_media_url}>link to the video</a> instead.</p>
                  </video>
                 </div>
              )
 
            }

            if(testData.data.post_hint==="rich:video"&&testData.data.preview.reddit_video_preview)   {
              zeroNullData=true
              return(
                <div className="videoDiv" key={i}>
                    <p className="titleText">{testData.data.title}</p>                  
                  <video controls ref={(el)=> this.videoPlayer = el} autoPlay={this.props.autoplay} poster={testData.data.thumbnail} preload="none" className="video" loop={testData.data.preview.reddit_video_preview.duration<5?true:false} >
                    <source type="video/mp4" src={testData.data.preview.reddit_video_preview.scrubber_media_url}/>
                    <p>Your browser doesn't support HTML5 video. Here is a <a href={testData.data.preview.reddit_video_preview.scrubber_media_url}>link to the video</a> instead.</p>
                  </video>
                 </div>
              )

            }
            if(testData.data.post_hint==="hosted:video"&&testData.data.media.reddit_video)   {
              zeroNullData=true
              return(

                <div className="videoDiv" key={i}>
                <p className="titleText">{testData.data.title}</p>
                  <video controls ref={(el)=> this.videoPlayer = el} autoPlay={this.props.autoplay} preload="n" className="video" loop={testData.data.media.reddit_video.duration<5?true:false} >
                    <source type="video/mp4" src={testData.data.media.reddit_video.scrubber_media_url}/>
                    <p>Your browser doesn't support HTML5 video. Here is a <a href={testData.data.media.reddit_video.scrubber_media_url}>link to the video</a> instead.</p>
                  </video>
                 </div>
              )

            }

            if(testData.data.post_hint==="image"&&testData.data.preview.reddit_video_preview)   {
              zeroNullData=true
              return(
                <div className="videoDiv" key={i}>
                <p className="titleText">{testData.data.title}</p>
                  <video controls  ref={(el)=> this.videoPlayer = el} autoPlay={this.props.autoplay} poster={this.imageParser(testData.data.preview.images[0].resolutions[1].url)} preload="none"  loop={testData.data.preview.reddit_video_preview.duration<5?true:false}  className="video">
                    <source type="video/mp4" src={testData.data.preview.reddit_video_preview.scrubber_media_url}/>
                    <p className="titleText">Your browser doesn't support HTML5 video. Here is a <a href={testData.data.preview.reddit_video_preview.scrubber_media_url}>link to the video</a> instead.</p>
                  </video>
                </div>
              )

            }            

            if(testData.data.post_hint==="image"){
              let sizeRatio= testData.data.preview.images[0].source.height+testData.data.preview.images[0].source.width
              if (testData.data.preview.images[0].source.height<300){
                zeroNullData=true
                return (
                  // dataCounter===1?
                  // <button autoFocus className="imgDiv" key={i}>
                  //   <img className="image" src={this.imageParser(testData.data.preview.images[0].source.url)} alt="{logo}"/>
                  //  </button>
                  //  :
                  <div className="imgDiv" key={i}>
                  <p className="titleText">{testData.data.title}</p>
                    <img className="image" src={this.imageParser(testData.data.preview.images[0].source.url)} alt="{logo}"/>
                   </div>
                 )
               }

              if (testData.data.preview.images[0].resolutions[3]&&sizeRatio>1500){
                zeroNullData=true
                return (
                  // dataCounter===1?
                  // <button autoFocus  className="imgDiv" key={i}>
                  //   <img className="image" src={this.imageParser(testData.data.preview.images[0].resolutions[4].url)} alt="{logo}"/>
                  // </button>
                  // :
                  <div  className="imgDiv" key={i}>
                  <p className="titleText">{testData.data.title}</p>
                    <img className="image" src={this.imageParser(testData.data.preview.images[0].resolutions[3].url)} alt="{logo}"/>
                  </div>
                 )
               }
                        
              if (testData.data.preview.images[0].resolutions[4]&&sizeRatio<1500){
                zeroNullData=true
                return (
                  // dataCounter===1?
                  // <button autoFocus  className="imgDiv" key={i}>
                  //   <img className="image" src={this.imageParser(testData.data.preview.images[0].resolutions[4].url)} alt="{logo}"/>
                  // </button>
                  // :
                  <div  className="imgDiv" key={i}>
                  <p className="titleText">{testData.data.title}</p>
                    <img className="image" src={this.imageParser(testData.data.preview.images[0].resolutions[4].url)} alt="{logo}"/>
                  </div>
                )
              }
            }
            else {
              return (null)
            }
                
        })
        if(zeroNullData===true){
           this.setState({sliderData: datavar})
           goBack.push(subreddit)
           console.log(goBack)
        }
          
        else{
          this.getSubreddit(this.shuffleArray(this.dataHandler(this.props.category)))
        }
      })
      .catch(error=> this.getSubreddit(this.shuffleArray(this.dataHandler(this.props.category)))) 
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