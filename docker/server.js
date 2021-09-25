/**
 * API Server script
 * Parse the requested URI and execute the queried command
 *
 */
const http = require('http');

let config = require('/app/config.json');

http.createServer(function (req, res) {
    const { spawn } = require('child_process');

    console.log(config);

    // Get the request URI, with the leading slash trimmed
    let uri = req.url.slice(- (req.url.length - 1));

    uri = decodeURI(uri);

    let args = uri.split(' ');
    let cmd = args.shift();

    // Restrict allowed commands to node, yarn & npm
    if (! config['allowed-commands'].includes(cmd)) {
        res.writeHead(403, {'Content-Type': 'text/plain'});
        res.end('403 Forbidden');
        return;
    }

    res.writeHead(200, {'Content-Type': 'text/plain'});

    console.log(args);

    let child = spawn(cmd, args);

    // @source https://stackoverflow.com/questions/14332721/node-js-spawn-child-process-and-get-terminal-output-live
    child.stdout.setEncoding('utf8');

    child.stdout.on('data', function (data) {
        // Render stdout messages in bold
        console.log("\033[01m", data.toString().replace(/[\n\r]/g, "\033[00m\n\033[01m"), "\033[00m");
        res.write(data.toString());
    });

    child.stderr.setEncoding('utf8');

    child.stderr.on('data', function (data) {
        console.log(data);
        res.write(data.toString());
    });

    child.on('close', function(code) {
        console.log('Exit status: ' + code);
        res.end();
    });
}).listen(config.port);
