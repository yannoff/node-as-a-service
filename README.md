# docker-node-api

A docker service to expose node/npm/yarn commands over http

**Github Repository: https://github.com/yannoff/node-as-a-service/**

## Purpose

Modern web application frameworks such as symfony,
are often coupled with `yarn` or `node` for assets building and compiling.

As a consequence, those javascript libraries have to be installed in
the `PHP` container, which violates a major principle of the docker philosophy: **one service per container**.

This project aims at restoring the separate of concerns: 
`node`, `NPM` or `yarn` commands are bundled in a dedicated container
which exposes an http API.

## Usage

### Example

```bash
curl http://0.0.0.0:5000/yarn+install
```

_will issue a `yarn install` command in the node server container._

On the other hand, the PHP container will have alternative `node`, `yarn` & `npm` scripts,
acting as pass-thru to the API endpoint.

_For instance:_

```bash
#!/bin/bash
#
# /usr/bin/node script example
#

# Determine the command name
executable=$(basename $0)

# Collect arguments to build the encoded URL
args=
while [ $# -gt 0 ]
do
    args="${args}%20$1"
    shift 1
done

# Here we assume the node-api service is named "n-a-a-s"
# The hostname must be changed to match the docker-compose.yaml services config 
curl http://n-a-a-s:5000/${executable}${args} 2>/dev/null
```

### Samples

A few sample files are provided:

- [docker-compose.yaml](https://github.com/yannoff/docker-node-api/blob/master/docker-compose.yaml) : Example docker compose config
- [bin/node-helper](https://github.com/yannoff/docker-node-api/blob/master/bin/node-helper) : Generic helper script for the PHP container


### Core files

_The following runtime files are bundled in the `/app` directory of the docker image, but can be overriden with a docker volume mount._

#### config.json

The [`config.json`](docker/config.json) file allows fine-tuning on the API server.

name|type|description|default
---|---|---|---
allowed-commands|list|List of the commands exposed to the API<br/>*Any other command call will result in a `403 Forbidden` response code.*|`["node", "npm", "yarn"]`
port|int|The port the server will listen to **<sup>(1)</sup>**|5000

**<sup>(1)</sup>** *Beware: this value must match the exposed port in the `docker-compose.yaml` config.* 

#### server.js

The API entrypoint server script.


## Notes

### Assetic

To support [kriswallsmith/assetic](https://github.com/kriswallsmith/assetic), the `php` and `node` services config **must** follow a few principles in the  `docker-compose.yaml`:

- The `working_dir` must be the same in either containers
- The `/tmp` path must be shared between the two containers

## License

Licensed under the [MIT License](https://github.com/yannoff/docker-node-api/blob/master/LICENSE)
