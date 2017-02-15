import io from 'socket.io-client';
import * as events from '../../server/events';
import facebook from './facebook-embed';

class Facebook {
  constructor() {
    this.socket = io();

    facebook.then(fb => {
      
    });

    this.socket.on(events.SEND_COMMENTS, this.handleComments);
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

  connectToStream(videoId) {
    return this.login().then(accessToken => {
      console.log("Got access token! :D", accessToken);
      return new Promise((resolve, reject) => {
        this.socket.emit(events.CONNECT_TO_STREAM, {videoId, accessToken});

        this.socket.once(events.CONNECTED, () => {
          resolve();
        });
      });
    });
  }

  handleComments(comments) {
    console.log("Look I got these comments!", comments);
  }
}

export default function() {
  return new Facebook();
}