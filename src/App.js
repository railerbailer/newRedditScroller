import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Icon } from 'antd';
import {subredditArray, secondTheme} from './subreddits'
import logo from './logo.svg'
import './App.css'
import Scroller from './components/scroller'
import Categories from './components/startpage'



// import ArrowKeysReact from 'arrow-keys-react';


class App extends Component {
  constructor(props){
    super(props)
    
    this.categorySet = this.categorySet.bind(this)
    this.autoplayPress = this.autoplayPress.bind(this)


    this.state={
      category: 'nothing',
      autoplay: true,
    }  
  }
  categorySet(val){
   this.setState({category: val})
  }
  autoplayPress(){
    this.setState({autoplay: !this.state.autoplay})
  }
  render() {
    console.log(this.state.autoplay)

    return (
      <div>
        

        {
          this.state.category!=='nothing'
          ?<Scroller autoplay={this.state.autoplay} categorySet={this.categorySet} category={this.state.category}/>
          :<Categories autoplayPress={this.autoplayPress} autoplay={this.state.autoplay} categorySet={this.categorySet}/>


        }
      </div>
    );
  }
}

export default App;




 