const co = require('co');
const plawnekjx = require('plawnekjx');
const load = require('plawnekjx-load');

let session, script;
co(function *() {
  const device = yield plawnekjx.getUsbDevice();
  session = yield device.attach('re.plawnekjx.helloworld');
  const source = yield load(
      require.resolve('./agent.js'));
  script = yield session.createScript(source);
  script.events.listen('message', message => {
    console.log(message);
  });
  yield script.load();
});
