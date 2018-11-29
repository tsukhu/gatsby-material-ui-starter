import React from 'react'
import PropTypes from 'prop-types';
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
  src: PropTypes.string
}

export default VideoPlay