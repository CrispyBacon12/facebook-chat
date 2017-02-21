import io from 'socket.io-client';
import * as events from '../../server/events';
import facebook from './facebook-embed';

class Facebook {
  constructor() {
    this.socket = io();
  }

  login() {
    return new Promise((resolve, reject) => {
      facebook.then(fb => {
        fb.getLoginStatus(response => {
          // already logged in, great!
          if (response.status === 'connected') {
            return resolve(response.authResponse.accessToken);
          }

          // not logged in to either facebook or app (or both)
          fb.login(response => {
            if (response.status === 'connected') {
              return resolve(response.authResponse.accessToken);
            }

            // after trying to log in, the user declined or the app was found to be blocked
            return reject(response);
          });
        })
      });
    });    
  }

  connectToStream(videoId, cb) {
    this.login().then(accessToken => {
      this.clearCommentsHandler();

      this.socket.emit(events.CONNECT_TO_STREAM, {videoId, accessToken});
      this.setCommentsHandler(cb);
    });
  }

  clearCommentsHandler() {
    if (this.commentsHandler) {
      this.socket.removeListener(events.SEND_COMMENTS, this.commentsHandler);
    }
  }

  setCommentsHandler(cb) {
    this.commentsHandler = cb;
    this.socket.on(events.SEND_COMMENTS, cb);
  }

  broadcastApproveComment(comment) {
    console.log("Approving comment on socket", this.socket);
    this.socket.emit(events.APPROVE_COMMENT, comment);
  }

  broadcastDisapproveComment(comment) {
    console.log('Disapproving comment on socket', this.socket);
    this.socket.emit(events.DISAPPROVE_COMMENT, comment);
  }

  subscribeApprovals(cb) {
    this.socket.on(events.APPROVE_COMMENT, cb);
  }

  subscribeDisapproves(cb) {
    this.socket.on(events.DISAPPROVE_COMMENT, cb);
  }
}

export default function() {
  return new Facebook();
}
