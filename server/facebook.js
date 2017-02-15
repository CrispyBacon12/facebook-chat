const EventEmitter = require('events');
const request = require('request');
const graph = require('fbgraph');

exports.fetchExistingComments = (videoId, accessToken) => {
  const emitter = new EventEmitter();

  graph.get(videoId, { fields: ['id', 'comments'].join(',') }, (err, res) => {
    if (err) {
      return emitter.emit('error', err);
    }

    emitter.emit('comments', res.comments.data);
    nextPage(emitter, res.comments.paging);
  });

  return emitter;
}

function nextPage(emitter, paging) {
  // was this the last page?
  if (!paging.next) {
    return;
  }

  // otherwise get the next page and emit it on success
  graph.get(paging.next, (err, res) => {
    if (err) {
      return emitter.emit('error', err);
    }

    emitter.emit('comments', res.data);
    nextPage(emitter, res.paging);
  });
}

exports.setAccessToken = (accessToken) => {
  graph.setAccessToken(accessToken);
}