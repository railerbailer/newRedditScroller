import React, { Component,Fragment } from 'react'
import 'antd/dist/antd.css';
import { Icon, Button } from 'antd';
import {subredditArray, secondTheme} from './subreddits'
import logo from './logo.svg'
import './App.css'
import Scroller from './components/scroller'
import StartPage from './components/startpage'
import {Route, Switch} from 'react-router-dom'



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
      category: null,
      autoplay: false,
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
    if(this.state.category!=='nothing'){
      return(<Scroller autoplay={this.state.autoplay} categorySet={this.categorySet} category={this.state.category}/>
      )
    }

   
    
    else{
      return(
        <StartPage autoplayPress={this.autoplayPress} autoplay={this.state.autoplay} categorySet={this.categorySet}/>
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
        <Switch>  
          <Route path={`/scroll/${this.state.category}`} render={() => <Scroller autoplay={this.state.autoplay} categorySet={this.categorySet} category={this.state.category}/>}/>
          <Route path='/' render={() => <StartPage autoplayPress={this.autoplayPress} autoplay={this.state.autoplay} category={this.state.category} categorySet={this.categorySet}/>}/>
        </Switch>


      </div>
    );
  }
}

export default App;




 