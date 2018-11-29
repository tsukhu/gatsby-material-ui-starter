import React from 'react'
class VideoPlay extends React.Component {

  render() {
    return (
      <div>
        <video width="100%" loop muted autoPlay>
          <source src={this.props.src} type="video/mp4"></source>
          Your browser does not support HTML5 video.
</video>
      </div>
    )
  }
}


VideoPlay.defaultProps = {
  src: 'https://www.bubly.com/static/videos/bubly-tvc.mp4'
}

export default VideoPlay