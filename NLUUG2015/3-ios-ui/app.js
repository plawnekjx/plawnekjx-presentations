const co = require('co');
const plawnekjx = require('plawnekjx');
const load = require('plawnekjx-load');

let session, script;
co(function *() {
  const device = yield plawnekjx.getUsbDevice();
  const app = yield device.getFrontmostApplication();
  if (app === null)
    throw new Error("No app in foreground");
  session = yield device.attach(app.pid);
  const source = yield load(
      require.resolve('./agent.js'));
  script = yield session.createScript(source);
  script.events.listen('message', message => {
    console.log(message.payload.ui);
    session.detach();
  });
  yield script.load();
});
