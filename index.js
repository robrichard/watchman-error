'use strict';

const watchman = require('fb-watchman');

function hasWatchmanInstalled() {
  try {
    return new Promise(resolve => {
      const client = new watchman.Client();
      // Only way to prevent this function from throwing is to uncomment the below
      // `is watchman installed` is never logged otherwise
      // client.on('error', () => {
      //     console.log('on error');
      //     resolve(false);
      // });
      client.capabilityCheck(
        {
          optional: [],
          required: ['relative_root']
        },
        error => {
          if (error) {
            console.log('found error');
            resolve(false);
            return;
          }
          console.log('no error found');
          resolve(true);
        }
      );
    });
  } catch (e) {
    console.log('caught error');
    return false;
  }
}

hasWatchmanInstalled().then(isInstalled =>
  console.log('is watchman installed?', isInstalled)
);
