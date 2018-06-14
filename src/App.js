import React, { Component,Fragment } from 'react'
import 'antd/dist/antd.css';
import { Icon, Button } from 'antd';
import {subredditArray, secondTheme} from './subreddits'
import logo from './logo.svg'
import './App.css'
import Scroller from './components/scroller'
import Categories from './components/startpage'



// import ArrowKeysReact from 'arrow-keys-react';
const styles={
  appWrap:{
     

  }
}

class App extends Component {
  constructor(props){
    super(props)
    
    this.categorySet = this.categorySet.bind(this)
    this.autoplayPress = this.autoplayPress.bind(this)


    this.state={
      nsfwAccept: false,
      category: 'nothing',
      autoplay: true,
    }  
  }

  switchOnThem(){
    switch(this.state.nsfwAccept){
      case false:
      console.log('TWOTRUE')
      break;
      case true:
      console.log('ONETRUE')

    }
  }

  renderContent(){
    if(this.state.category!=='nothing'&&this.state.category==='NORMAL'){
      return(<Scroller autoplay={this.state.autoplay} categorySet={this.categorySet} category={this.state.category}/>
      )
    }

    if(this.state.category!=='nothing'){
      if(this.state.nsfwAccept===false){
            return (
              <div style={{position: 'absolute',top: '25%', left: '40%', align: 'center', textAlign: 'center'}}>
                    <p style={{color: 'white'}}>NSFW CONTENT! Are you over 18</p>
                    <Button onClick={()=>this.setState({nsfwAccept: true})}>Yes</Button>
                    <Button  onClick={()=>this.setState({nsfwAccept: false, category: 'nothing'})}>No</Button>             
              </div>

              )
        }

        else return(<Scroller autoplay={this.state.autoplay} categorySet={this.categorySet} category={this.state.category}/>)

      
    }
    
    else{
      return(
        <Categories autoplayPress={this.autoplayPress} autoplay={this.state.autoplay} categorySet={this.categorySet}/>
        )
    }

  }

  categorySet(val){
   this.setState({category: val})
  }
  autoplayPress(){
    this.setState({autoplay: !this.state.autoplay})
  }
  render() {
    

    return (
      <div style={styles.appWrap}>
        
        {
          this.renderContent() 
        }


      </div>
    );
  }
}

export default App;




 