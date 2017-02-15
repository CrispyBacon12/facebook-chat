import facebookConnector from '../services/facebook';

const facebook = facebookConnector();

export const CONNECT_TO_STREAM = 'CONNECT_TO_STREAM';
export function connectToStream(videoId) {
  const connection = facebook.connectToStream(videoId);

  return {
    type: CONNECT_TO_STREAM,
    payload: connection
  }
}