import React from "react";
import axios from "axios";
import FormatNumber from "./FormatNumber.js";
import ColorContext from "./ColorContext.js";
import * as AppConstant from "./AppConstants.js";
import ErrorBoundary from "./ErrorBoundary.js";
import Modal from "./Modal.js";

class WatchArea extends React.Component {
  constructor() {
    super();
    this.state = { loading: true, showModal: false };
  }

  componentDidMount() {
    axios
      .get(`${AppConstant.VIDEO_URL}&id=${this.props.id}`)
      .then((res) => {
        const item = res.data.items[0];
        this.setState({
          title: item.snippet.title,
          views: item.statistics.viewCount,
          description: item.snippet.description,
          channel: item.snippet.channelTitle,
          like: item.statistics.likeCount,
          url: item.id,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  goToYoutube = () => {
    window.open(`https://www.youtube.com/watch?v=${this.state.url}`);
  };

  render() {
    if (this.state.loading) {
      return <div className="loader"></div>;
    }
    const { title, views, description, channel, like, url, showModal } =
      this.state;
    return (
      <div className="watch-area">
        <div className="player">
          <iframe
            src={`//www.youtube.com/embed/${url}`}
            title={title}
            width="635px"
            height="357px"
            frameBorder="0"
            allow="autoplay encrypted"
            allowFullScreen="true"
          ></iframe>
        </div>
        <h1>{title}</h1>
        <div className="video-stats">
          <div className="">
            <FormatNumber number={views} />
            &ensp;Views
          </div>
          <div className="">
            <FormatNumber number={like} />
            &ensp;Likes
          </div>
        </div>
        <div className="channel-name">{channel} Channel</div>
        <ColorContext.Consumer>
          {([themeColor]) => (
            <button
              onClick={this.toggleModal}
              style={{ backgroundColor: themeColor }}
            >
              Watch on Youtube
            </button>
          )}
        </ColorContext.Consumer>
        <p>{description}</p>

        {showModal ? (
          <Modal>
            <h1>Would you like to watch this video on youtube ?</h1>
            <div className="buttons">
              <button className="btn-green" onClick={this.goToYoutube}>
                Yes
              </button>
              <button onClick={this.toggleModal}>No</button>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default function WatchAreaWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <WatchArea {...props} />
    </ErrorBoundary>
  );
}
