#!/usr/bin/env node

const { spawn } = require('child_process');
const {onExit} = require('@rauschma/stringio');
const { builds } = require('../now.json');

const main = async () => {
  const servers = builds
    .map(build => build.src)
    .map(path => spawn.bind(null, 'npm', ['run', 'dev', path], {
      stdio: 'inherit'
    }));

  await Promise.all(servers);

  // await onExit(p);

  console.log('### DONE');

};

main()
  .then(data => console.log('>>> done successfully', data))
  .catch(err => console.error('>>> done erroneously', err));


