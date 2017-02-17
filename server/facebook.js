const EventEmitter = require('events');
const request = require('request');
const graph = require('fbgraph');

exports.fetchExistingComments = (videoId, accessToken) => {
  const emitter = new EventEmitter();
  const MAX_PAGES = 2;

  graph.get(videoId, { fields: ['id', 'comments.limit(100)'].join(',') }, (err, res) => {
    if (err) {
      return emitter.emit('error', err);
    }

    emitter.emit('comments', res.comments.data);
    nextPage(emitter, res.comments.paging, MAX_PAGES-1);
  });

  return emitter;
}

function nextPage(emitter, paging, numRecursions) {
  // was this the last page?
  if (!paging.next || numRecursions < 0) {
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

exports.subs