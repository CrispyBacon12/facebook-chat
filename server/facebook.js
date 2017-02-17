const EventEmitter = require('events');
const request = require('request');
const graph = require('fbgraph');

exports.fetchExistingComments = (videoId, limit = 100, maxPages = 2, emitter = null) => {
  emitter = emitter || new EventEmitter();

  graph.get(videoId, { fields: ['id', `comments.limit(${limit}).order(reverse_chronological)`].join(',') }, (err, res) => {
    if (err) {
      return emitter.emit('error', err);
    }

    emitter.emit('comments', res.comments.data);
    nextPage(emitter, res.comments.paging, maxPages-1);
  });

  return emitter;
}

function nextPage(emitter, paging, numRecursions) {
  // was this the last page?
  if (!paging.next || numRecursions <= 0) {
    return;
  }

  // otherwise get the next page and emit it on success
  graph.get(paging.next, (err, res) => {
    if (err) {
      return emitter.emit('error', err);
    }

    emitter.emit('comments', res.data);
    nextPage(emitter, res.paging, --numRecursions);
  });
}

exports.setAccessToken = (accessToken) => {
  graph.setAccessToken(accessToken);
}

exports.subscribeLatestComments = (videoId, emitter) => {
  setInterval(this.fetchExistingComments.bind(this, videoId, 20, 1, emitter), 5000);
}

exports.fetchComments = (videoId) => {
  const emitter = this.fetchExistingComments(videoId);
  this.subscribeLatestComments(videoId, emitter);

  return emitter;
}