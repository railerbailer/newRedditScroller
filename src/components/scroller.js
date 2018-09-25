import React, { Component } from "react";
import Swipeable from "react-swipeable";
import "antd/dist/antd.css";
import {
  Icon,
  Button,
  Spin,
  message,
  notification,
  Menu,
  Dropdown
} from "antd";

import {
  subredditArray,
  NSFW,
  artArray,
  foodArray,
  animalsArray
} from "../subreddits";
import "../App.css";
import "react-html5video/dist/styles.css";
import { Redirect, Route } from "react-router-dom";

let goBack = [];
let goBackIndex = 0;
class Scroller extends Component {
  constructor(props) {
    super(props);
    this.contentRef = React.createRef();

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.swipedUp = this.swipedUp.bind(this);
    this.swipedDown = this.swipedDown.bind(this);
    this.swipedLeft = this.swipedLeft.bind(this);
    this.swipedRight = this.swipedRight.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.switchCat = this.switchCat.bind(this);
    this.goBackToLast = this.goBackToLast.bind(this);
    this.imageParser = this.imageParser.bind(this);
    this.changeCat = this.changeCat.bind(this);

    this.state = {
      urls: [],
      loop: true,
      autoPlay: true,
      sliderData: [],
      subreddit: "",
      activeSlide: 0,
      activeSlide2: 0,
      looper: false,
      visibleUp: true,
      visibility: true,
      visibleBackLeft: false,
      alreadyChecked: false,
      spinning: true,
      underage: true
    };
  }

  componentDidMount() {}

  dataHandler(props) {
    if (props === "NSFW") {
      return NSFW;
    }
    if (props === "NORMAL") {
      return subredditArray;
    }
    if (props === "Art") {
      return artArray;
    }
    if (props === "Food") {
      return foodArray;
    }
    if (props === "Animals") {
      return animalsArray;
    } else {
      return subredditArray;
    }
  }

  //checks for file type
  checkGif(url) {
    return url.match(/\.(gif)$/) !== null;
  }
  checkImg(url) {
    return url.match(/\.(jpeg|jpg|png)$/) !== null;
  }

  imageParser(url) {
    let editedUrl = "";
    editedUrl = url
      .replace(/&gt;/gi, ">")
      .replace(/&lt;/gi, "<")
      .replace(/&amp;/gi, "&");
    return editedUrl;
  }

  next() {
    this.setState({ activeSlide: this.state.activeSlide + 1 });
    this.state.sliderData.length - 1 === this.state.activeSlide &&
      this.setState({ activeSlide: 0 });
  }
  previous() {
    const infiniteScroll =
      this.state.activeSlide <= 0
        ? this.state.sliderData.length && this.state.sliderData.length - 1
        : this.state.activeSlide - 1;
    this.setState({ activeSlide: infiniteScroll });
  }

  async switchCat() {
   await this.setState({ sliderData: [], activeSlide: 0 });
    if (goBackIndex > 0) {
      goBackIndex = goBackIndex - 1;
      if (this.state.subreddit === goBack[goBack.length - 1 - goBackIndex]) {
         this.getSubreddit(goBack[goBack.length - goBackIndex]);
      } else  this.getSubreddit(goBack[goBack.length - 1 - goBackIndex]);
    } else {
       this.getSubreddit(
        this.shuffleArray(this.dataHandler(this.props.category))
      );
      if (
        goBackIndex === 0 &&
        goBack[goBack.length - 1] !== this.state.subreddit
      ) {
         goBack.push(this.state.subreddit);
      }
    }

    console.log("GOBACKINDEX", goBackIndex);
    console.log("ARRAYGOBACK", goBack);
    // goBack.push(this.state.subreddit);
  }

  async goBackToLast() {
    this.setState({ sliderData: [] });
    if (goBack.length > 0) {
      if (this.state.subreddit === goBack[goBack.length - 1 - goBackIndex]) {
        this.getSubreddit(goBack[goBack.length - 2 - goBackIndex]);
      } else this.getSubreddit(goBack[goBack.length - 1 - goBackIndex]);
    }
    goBackIndex < goBack.length
      ? (goBackIndex = goBackIndex + 1)
      : console.log("doing nothin...");
    console.log("GOBACKINDEX", goBackIndex);
    if (!goBack.includes(this.state.subreddit)) {
      console.log("INCLUDES", goBack);
      goBack.push(this.state.subreddit);
    }
  }

  handleKeyDown(e) {
    if (e.key === "ArrowLeft") {
      this.goBackToLast();
    }
    if (e.key === "a") {
      this.goBackToLast();
    }
    if (e.key === "ArrowDown") {
      this.next();
    }

    if (e.key === "s") {
      this.next();
    }
    if (e.key === "w") {
      this.previous();
    }
    if (e.key === " ") {
      if (this.videoPlayer) {
        if (this.videoPlayer.paused) {
          this.videoPlayer.play();
        } else this.videoPlayer.pause();
      }
    }

    if (e.key === "ArrowUp") {
      this.previous();
    }
    if (e.key === "ArrowRight") {
      this.switchCat();
    }
    if (e.key === "d") {
      this.switchCat();
    }
  }

  swipedLeft(e, absX, isFlick) {
    if (isFlick || absX > 30) {
      this.switchCat();
    }
  }

  swipedRight(e, absX, isFlick) {
    if (isFlick || absX > 30) {
      this.goBackToLast();
    }
  }
  swipedUp(e, deltaY, isFlick) {
    if (isFlick) {
      this.next();
    }
  }
  swipedDown(e, deltaY, isFlick) {
    if (isFlick) {
      this.previous();
    }
  }

  shuffleArray(array) {
    let random = Math.floor(Math.random() * array.length);
    return array[random];
  }

  loadingOrNo() {
    this.state.sliderData.length === 0
      ? this.setState({ spinning: true })
      : this.setState({ spinning: false });
  }
  changeCat(cat) {
    this.setState({ sliderData: [] });
    this.props.categorySet(cat);
    this.getSubreddit(this.shuffleArray(this.dataHandler(cat)));
    message.info(
      `Category is ${cat}, press or swipe right to shuffle subreddit`
    );
  }
  openNotification() {
    notification.open({
      duration: 3,
      message: "Note!",
      description:
        "Swipe, or use your keyboard arrows or a,s,w,d to shuffle or scroll posts."
    });
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <div onClick={() => this.changeCat("NSFW")}>NSFW</div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={() => this.changeCat("Normal")}>SFW</div>
        </Menu.Item>
        <Menu.Item> 
          <div onClick={() => this.changeCat("Art")}>ART</div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={() => this.changeCat("Animals")}>ANIMALS</div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={() => this.changeCat("Food")}>FOOD</div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item disabled>{this.props.category}</Menu.Item>
      </Menu>
    );
    return (
      <Swipeable
        className="wrapper"
        onKeyDown={this.handleKeyDown}
        onSwipedDown={this.swipedDown}
        onSwipedUp={this.swipedUp}
        onSwipedLeft={this.swipedLeft}
        onSwipedRight={this.swipedRight}
      >
        <Redirect push to={`/${this.state.subreddit}`} />
        {/* {this.videoPlayer && 
      this.videoPlayer.paused && 
            <Spin wrapperClassName="videoLoader" size="large" >{console.log('we right here')}</Spin>} */}
        {this.props.category === "Switch category" ? (
          <div className="categoryModal">
            <div className="description">
              Welcome to Sliddit.com!
              <br />
              Choose a category:
            </div>
            <div className="grid-container">
              <Button className="item1" onClick={() => this.changeCat("NSFW")}>
                NSFW
              </Button>

              <Button className="item2" onClick={() => this.changeCat("Art")}>
                ART
              </Button>

              <Button className="item3" onClick={() => this.changeCat("Food")}>
                FOOD
              </Button>

              <Button
                className="item4"
                onClick={() => this.changeCat("Normal")}
              >
                SFW
              </Button>

              <Button
                className="item5"
                onClick={() => this.changeCat("Animals")}
              >
                ANIMALS
              </Button>
            </div>
          </div>
        ) : null}
        <div className="switchTitle">
          <h1 className="scrollLogo">sliddit. BETA</h1>
          <Icon onClick={this.previous} className="iconUp" type="up" />
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button type="dashed" ghost className="iconSetting">
              {this.props.category}
              <Icon type="sync" className="chooseCat" />
            </Button>
          </Dropdown>
        </div>

        <button onClick={this.switchCat} style={styles.iconRight}>
          <Icon type="right" />
        </button>

        <Icon onClick={this.goBackToLast} style={styles.iconLeft} type="left" />
        <Icon type="close" />
        <div className="downDiv">
          <button onClick={this.next} className="iconDownClicker">
            <h2 className="titlesLeft">
              <Icon type="tag-o" />
              {this.state.subreddit}
            </h2>
            <Icon className="iconDown" type="down" />
          </button>
        </div>
        <button
          className="inputFocus"
          ref={button => button && button.focus()}
        />

        {this.state.sliderData.length === 0 ? (
          <button
            ref={button => button && button.focus()}
            className="subRedditTitle"
          >
            <Spin wrapperClassName="subRedditTitle" size="large" />
            <p className="loading">
              Loading <Icon type="tag-o" />
              {this.state.subreddit}
            </p>
          </button>
        ) : (
          this.state.sliderData[this.state.activeSlide]
        )}
      </Swipeable>
    );
  }

  async fetcher(subreddit) {
    fetch(`https://www.reddit.com/r/${subreddit}.json?limit=100`)
      .then(response => response.json())
      .then(jsonData => {
        let urlData = jsonData.data.children.map((testData, i) => {
          if (testData.data.preview) {
            if (testData.data.preview.images) {
              return testData.data.preview.images;
            } else return console.log("NOPE");
          }
        });
        console.log("URLDATA ", urlData);
      });
  }

  async getSubreddit(subreddit) {
    this.setState({ subreddit: subreddit });

    //Om det blev fel kan det vara annat än url som inte finns...
     await fetch(`https://www.reddit.com/r/${subreddit}.json?limit=100`)
      .then(response => response.json())
      .then(jsonData => {
        let zeroNullData = false;
        let datavar = jsonData.data.children.map((testData, i) => {
          if (
            testData.data.post_hint === "link" &&
            testData.data.preview.reddit_video_preview
          ) {
            zeroNullData = true;
            return (
              <div className="videoDiv" key={i}>
                <p className="titleText">{testData.data.title}</p>
                <video
                  className="video"
                  ref={el => (this.videoPlayer = el)}
                  muted
                  controls
                  playsInline
                  autoPlay={this.state.autoPlay}
                  poster={this.imageParser(
                    testData.data.preview.images[0].resolutions[1].url
                  )}
                  preload="none"
                  loop={this.state.loop}
                >
                  <source
                    type="video/mp4"
                    src={
                      testData.data.preview.reddit_video_preview
                        .scrubber_media_url
                    }
                  />
                  <p>
                    Your browser doesn't support HTML5 video. Here is a{" "}
                    <a
                      href={
                        testData.data.preview.reddit_video_preview
                          .scrubber_media_url
                      }
                    >
                      link to the video
                    </a>{" "}
                    instead.
                  </p>
                </video>
              </div>
            );
          }

          if (
            testData.data.post_hint === "rich:video" &&
            testData.data.preview.reddit_video_preview
          ) {
            zeroNullData = true;
            return (
              <div className="videoDiv" key={i}>
                <p className="titleText">{testData.data.title}</p>
                <video
                  className="video"
                  ref={el => (this.videoPlayer = el)}
                  muted
                  preload="none"
                  controls
                  playsInline
                  autoPlay={this.state.autoPlay}
                  poster={testData.data.thumbnail}
                  loop={this.state.loop}
                >
                  <source
                    type="video/mp4"
                    src={
                      testData.data.preview.reddit_video_preview
                        .scrubber_media_url
                    }
                  />
                  <p>
                    Your browser doesn't support HTML5 video. Here is a{" "}
                    <a
                      href={
                        testData.data.preview.reddit_video_preview
                          .scrubber_media_url
                      }
                    >
                      link to the video
                    </a>{" "}
                    instead.
                  </p>
                </video>
              </div>
            );
          }
          if (
            testData.data.post_hint === "hosted:video" &&
            testData.data.media.reddit_video
          ) {
            zeroNullData = true;
            return (
              <div className="videoDiv" key={i}>
                <p className="titleText">{testData.data.title}</p>
                <video
                  className="video"
                  ref={el => (this.videoPlayer = el)}
                  muted
                  playsInline
                  controls
                  autoPlay={this.state.autoPlay}
                  loop={this.state.loop}
                  preload="none"
                >
                  <source
                    type="video/mp4"
                    src={testData.data.media.reddit_video.scrubber_media_url}
                  />
                  <p>
                    Your browser doesn't support HTML5 video. Here is a{" "}
                    <a
                      href={testData.data.media.reddit_video.scrubber_media_url}
                    >
                      link to the video
                    </a>{" "}
                    instead.
                  </p>
                </video>
              </div>
            );
          }

          if (
            testData.data.post_hint === "image" &&
            testData.data.preview.reddit_video_preview
          ) {
            zeroNullData = true;
            return (
              <div className="videoDiv" key={i}>
                <p className="titleText">{testData.data.title}</p>
                <video
                  className="video"
                  ref={el => (this.videoPlayer = el)}
                  muted
                  controls
                  playsInline
                  autoPlay={this.state.autoPlay}
                  poster={this.imageParser(
                    testData.data.preview.images[0].resolutions[1].url
                  )}
                  loop={this.state.loop}
                  preload="none"
                >
                  <source
                    type="video/mp4"
                    src={
                      testData.data.preview.reddit_video_preview
                        .scrubber_media_url
                    }
                  />
                  <p className="titleText">
                    Your browser doesn't support HTML5 video. Here is a{" "}
                    <a
                      href={
                        testData.data.preview.reddit_video_preview
                          .scrubber_media_url
                      }
                    >
                      link to the video
                    </a>{" "}
                    instead.
                  </p>
                </video>
              </div>
            );
          }

          if (testData.data.post_hint === "image") {
            let sizeRatio =
              testData.data.preview.images[0].source.height +
              testData.data.preview.images[0].source.width;
            if (testData.data.preview.images[0].source.height < 300) {
              zeroNullData = true;
              return (
                <div className="imgDiv" key={i}>
                  <p className="titleText">{testData.data.title}</p>
                  <img
                    className="image"
                    src={this.imageParser(
                      testData.data.preview.images[0].source.url
                    )}
                    alt="{logo}"
                  />
                </div>
              );
            }

            if (
              testData.data.preview.images[0].resolutions[3] &&
              sizeRatio > 1500
            ) {
              zeroNullData = true;
              return (
                <div className="imgDiv" key={i}>
                  <p className="titleText">{testData.data.title}</p>
                  <img
                    className="image"
                    src={this.imageParser(
                      testData.data.preview.images[0].resolutions[3].url
                    )}
                    alt="{logo}"
                  />
                </div>
              );
            }

            if (
              testData.data.preview.images[0].resolutions[4] &&
              sizeRatio < 1500
            ) {
              zeroNullData = true;
              return (
                <div className="imgDiv" key={i}>
                  <p className="titleText">{testData.data.title}</p>
                  <img
                    className="image"
                    src={this.imageParser(
                      testData.data.preview.images[0].resolutions[4].url
                    )}
                    alt="{logo}"
                  />
                </div>
              );
            }
          } else {
            return null;
          }
          return null;
        });
        if (zeroNullData === true) {
          
          this.setState({ sliderData: datavar.filter(e => e !== null)});
        } else {
          this.getSubreddit(
            this.shuffleArray(this.dataHandler(this.props.category))
          );
        }
      })
      .catch(error =>
        this.getSubreddit(
          this.shuffleArray(this.dataHandler(this.props.category))
        )
      );
  }
}

export default Scroller;

const styles = {
  iconLeft: {
    opacity: 0.4,
    backgroundColor: "transparent",
    position: "absolute",
    top: "50%",
    paddingRight: "20%",
    zIndex: 1,
    color: "white",
    left: 1,
    textAlign: "left",
    height: "50%",
    fontSize: "20px"
  },
  iconRight: {
    backgroundColor: "transparent",
    opacity: 0.4,
    height: "100%",
    position: "absolute",
    zIndex: 1,
    paddingLeft: "20%",
    right: 1,
    textAlign: "right",
    fontSize: "20px",
    color: "white"
  }
};
