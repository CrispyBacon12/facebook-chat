export const CONNECT_TO_STREAM = 'CONNECT_TO_STREAM';
export function connectToStream(videoId) {
  const request = new Promise((resolve, reject) => {
    console.log("Connecting to stream!");
    resolve({});
  });

  return {
    type: CONNECT_TO_STREAM,
    payload: request
  }
}