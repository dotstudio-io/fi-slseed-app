/* eslint-disable */
// This service worker file is effectively a 'no-op' that will reset any
// previous service worker registered for the same host:port combination.
// In the production build, this file is replaced with an actual service worker
// file that will precache your site's local assets.
// See https://github.com/facebookincubator/create-react-app/issues/2272#issuecomment-302832432

self.addEventListener('install', function () {
  return self.skipWaiting();
});

self.addEventListener('activate', function () {
  self.clients.matchAll({ type: 'window' }).then(function (windowClients) {
    // for (let windowClient of windowClients) {
    for (var i = 0, l = windowClients.length; i < l; i += 1) {
      var windowClient = windowClients[i];
      // Force open pages to refresh, so that they have a chance to load the
      // fresh navigation response from the local dev server.
      windowClient.navigate(windowClient.url);
    }
  });
});
