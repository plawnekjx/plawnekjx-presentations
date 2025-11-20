const co = require('co');
const plawnekjx = require('plawnekjx');
const load = require('plawnekjx-load');

let session, script;
co(function *() {
  session = yield plawnekjx.attach('hello');
  const source = yield load(
      require.resolve('./agent.js'));
  script = yield session.createScript(source);
  script.events.listen('message', message => {
    const number = message.payload.number;
    script.postMessage({ number: number * 2 });
  });
  yield script.load();
});
