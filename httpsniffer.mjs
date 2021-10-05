import * as util from "util";
import * as url from "url";

const timestamp = () => new Date().toISOString();

export function sniffOn(server) {
  server.on("request", (req, res) => {
    console.log(`${timestamp} request`);
    console.log(`${timestamp} ${reqToString(req)}`);
  });

  server.on("close", (errno) => {
    console.log(`${timestamp} close errno=${errno}`);
  });

  server.on("checkContinue", (req, res) => {
    console.log(`${timestamp} checkContinue`);
    console.log(`${timestamp} ${reqToString(req)}`);
    res.writeContinue();
  });

  server.on("upgrade", (req, socket, head) => {
    console.log(`${timestamp} upgrade`);
    console.log(`${timestamp} ${reqToString(req)}`);
  });

  server.on("clientError", () => {
    console.log("clientError");
  });

  // server.on("connection", e_connection);
}

export function reqToString(req) {
  let ret = `request ${req.method} ${req.httpVersion} ${req.url}\n`;
  ret += JSON.stringify(url.parse(req.url, true)) + "\n";
  let keys = Object.keys(req.headers);
  for (let i = 0, l = keys.length; i < l; i++) {
    let key = keys[i];
    ret += `${i} ${key}: ${req.headers[key]}\n`;
  }
  if (req.trailers) {
    ret += util.inspect(req.trailers) + "\n";
  }
  return ret;
}
