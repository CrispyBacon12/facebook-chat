import React, { Component } from 'react';
import { VideoListItem } from './video_list_item';

export class VideoList extends Component {
  render() {
    const videoItems = this.props.videos.map((video) => {
      return <VideoListItem onClick={event => this.onVideoListItemClick(event)} key={video.id.videoId} video={video} />
    });

    return (
      <ul className="col-md-4 list-group">
        {videoItems}
      </ul>
    );
  }
}