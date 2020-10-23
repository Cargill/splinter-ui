# Copyright 2018-2020 Cargill Incorporated
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Canopy build stage
FROM node:lts-alpine as canopy-app-build-stage

RUN apk update && apk add python g++ git make && rm -rf /var/cache/apk/*
WORKDIR /splinter_ui
COPY app/package*.json ./
RUN npm config set unsafe-perm true && npm install
COPY app .
ENV REACT_APP_SPLINTER_URL "/splinterd"
ENV REACT_APP_SAPLING_URL "/sapling-dev-server"
RUN yarn build
WORKDIR /splinter_ui/build
ARG REPO_VERSION
RUN tar c -z . -f ../splinter_ui_v${REPO_VERSION}.tar.gz

# Sapling build stage
FROM node:lts-alpine as sapling-build-stage

RUN apk update && apk add git

RUN npm config set unsafe-perm true

COPY saplings saplings
COPY sapling-dev-server sapling-dev-server

ARG PUBLIC_URL_PARTIAL
ENV PUBLIC_URL $PUBLIC_URL_PARTIAL

RUN cd /saplings/register-login && \
  npm install && \
  npm run deploy

ENV PUBLIC_URL ${PUBLIC_URL_PARTIAL}/oauth-login
RUN cd /saplings/oauth-login && \
  npm install && \
  npm run deploy

ENV PUBLIC_URL ${PUBLIC_URL_PARTIAL}/profile
RUN cd /saplings/profile && \
  npm install && \
  npm run deploy

ENV PUBLIC_URL ${PUBLIC_URL_PARTIAL}/circuits
RUN cd /saplings/circuits && \
  npm install && \
  npm run deploy

WORKDIR sapling-dev-server
ARG REPO_VERSION
RUN tar c -z . -f ../splinter_saplings_v${REPO_VERSION}.tar.gz

# prod stage
FROM httpd:2.4 as prod-stage

COPY --from=canopy-app-build-stage /splinter_ui/splinter_ui_v*.tar.gz /tmp
RUN tar -xzvf /tmp/splinter_ui_*.tar.gz -C /usr/local/apache2/htdocs/

COPY --from=sapling-build-stage /splinter_saplings_v*.tar.gz /tmp
RUN mkdir /usr/local/apache2/htdocs/sapling-dev-server
RUN tar -xzvf /tmp/splinter_saplings_*.tar.gz \
  -C /usr/local/apache2/htdocs/sapling-dev-server/

COPY /configs/apache/httpd.conf /usr/local/apache2/conf/httpd.conf

RUN echo "\
  \n\
  LoadModule headers_module modules/mod_headers.so\n\
  ProxyPass /splinterd \${SPLINTER_URL}\n\
  ProxyPassReverse /splinterd \${SPLINTER_URL}\n\
  <Directory "/usr/local/apache2/htdocs/sapling-dev-server">\n\
   Header set Access-Control-Allow-Origin "*"\n\
  </Directory>\n\
  \n\
  " >>/usr/local/apache2/conf/httpd.conf

EXPOSE 80/tcp
