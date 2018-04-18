import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Icon } from 'antd';
import {subredditArray, secondTheme} from '../subreddits'
import logo from '../logo.svg'
import '../App.css'

// import ArrowKeysReact from 'arrow-keys-react';


class Startpage extends Component {
  constructor(props){
    super(props)
    
    this.state={
      category: ''
    }  
  }

  
  
  render() {


    return (
      <div>
        <button onClick={e=>this.props.categorySet(e.target.value)} value="Random">
          Random Categ.
        </button>
        <button onClick={e=>this.props.categorySet(e.target.value)} value="Nature">
          Nature
        </button>
        <button onClick={e=>this.props.categorySet(e.target.value)} value="DontClickHere">
          DontClickHere
        </button>
        <button onClick={e=>this.props.categorySet(e.target.value)} value="NSFW">
          SomeOtherCategory
        </button>
        <button style={{backgroundColor: this.props.autoplay===true?'green':'red'}} onClick={this.props.autoplayPress} value={this.props.autoplay}>
          Autoplay
        </button>
      </div>
    );
  }
}

export default Startpage;




 