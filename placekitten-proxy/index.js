var http = require("http");
var httpProxy = require("http-proxy");
var fs = require("fs");
var path = require("path");

var proxy = httpProxy.createProxyServer({
  target: "http://placekitten.com",
  changeOrigin: true,
});

var server = http.createServer(function (req, res) {
  var reqpath = req.url.toString().split("?")[0].split("/");

  console.log(reqpath);

  if (reqpath[2] === "420" && reqpath[1] !== reqpath[2]) {
    var s = fs.createReadStream(path.join(__dirname, "happy_georg.png"));
    s.on("open", function () {
      res.setHeader("Content-Type", "image/png");
      s.pipe(res);
    });
    s.on("error", function () {
      res.setHeader("Content-Type", "text/plain");
      res.statusCode = 404;
      res.end("Not found");
    });
  } else {
    proxy.web(req, res);
  }
});

server.listen(4000);

console.log("Listening on port 4000");
