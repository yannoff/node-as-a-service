ARG VERSION=15
FROM node:${VERSION}-alpine

ARG PORT=5000
ARG LESS_VERSION
ARG NPM_PACKAGES="uglifycss uglify-es less-loader url-loader file-loader webpack"

ENV NODE_PATH /usr/local/lib/node_modules

VOLUME [ "/app", "/src" ]

RUN \
    apk add --no-cache bash git openssh-client && \
    npm i -g less${LESS_VERSION} ${NPM_PACKAGES} && \
    ln -s /usr/local/lib/node_modules /usr/lib


COPY server.js /app
COPY config.json /app

ENTRYPOINT [ "/usr/local/bin/node" ]

CMD [ "/app/server.js" ]

EXPOSE ${PORT}
