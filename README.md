# docker-node-api

A docker service to expose node/npm/yarn commands over http

**Github Repository: https://github.com/yannoff/docker-node-api/**


_**WARNING:** This is a **work in progress**_

## Purpose

Modern web application frameworks such as symfony,
are often coupled with `yarn` or `node` for assets building and compiling.

As a consequence, those javascript libraries have to be installed in
the `PHP` container, which is, from the `docker` point of view, not the
best practice.

This project aims at separating the javascript part: 
`node`, `NPM` or `yarn` commands are bundled in a dedicated container
which exposes an http API.

_For instance,_

```bash
curl http://0.0.0.0:5000/yarn+install
```

_will issue a_ 

```bash
yarn install
```

_command in the node server container._

On the other hand, the PHP container will have alternative `node`, `yarn` & `npm` scripts,
acting as pass-thru to the API endpoint.

_For instance:_

```bash
#!/bin/bash
#
# /usr/bin/node script example
#

# Collect arguments to build the encoded URL
args=
while [ $# -gt 0 ]
do
    args="${args}%20$1"
    shift 1
done

# Here we assume the node-api service is named "node"
# The hostname must be changed to match the docker-compose.yaml services config 
curl http://node:5000/node${args} 2>/dev/null

```

### Core files

#### config.json

The `config.json` file allows fine-tuning on the API server.

name|type|description
---|---|---|
allowed-commands|list|List of the commands exposed to the API<br/>*Any other command call will result in a `403 Forbidden` response code.*
port|int|The port the server will listen to **<sup>(1)</sup>**

**<sup>(1)</sup>** *Beware: this value must match the exposed port in the `docker-compose.yaml` config.* 

#### server.js

The API entrypoint server script.

### Samples

A few sample files are provided:

- [docker-compose.yaml](https://github.com/yannoff/docker-node-api/blob/master/docker-compose.yaml) : Example docker compose config
- [bin/node-helper](https://github.com/yannoff/docker-node-api/blob/master/bin/node-helper) : Generic helper script for the PHP container

## Notes

### Assetic

To support [kriswallsmith/assetic](https://github.com/kriswallsmith/assetic), the `php` and `node` services config **must** follow a few principles in the  `docker-compose.yaml`:

- The `working_dir` must be the same in either containers
- The `/tmp` path must be shared between the two containers

## License

Licensed under the [MIT License](https://github.com/yannoff/docker-node-api/blob/master/LICENSE)
