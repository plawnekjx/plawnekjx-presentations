const co = require('co');
const plawnekjx = require('plawnekjx');
const load = require('plawnekjx-load');

let session, script;
co(function *() {
  session = yield plawnekjx.attach('hello');
  const source = yield load(require.resolve('./agent.js'));
  script = yield session.createScript(source);
  yield script.load();
  const api = yield script.getExports();
  const result = yield api.disassemble('0x106a81ec0');
  console.log(result);
  yield session.detach();
});
