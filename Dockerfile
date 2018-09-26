FROM node:latest
WORKDIR /usr/src/app/
COPY package.json /usr/src/app/package.json
COPY vuex-bitshares/package.json vuex-bitshares/package.json
RUN npm install
# TO RUN FROM THIS STEP USE: --build-arg CACHEBUST=$(date +%s)
ARG CACHEBUST=1
COPY . /usr/src/app/
ENTRYPOINT ["/bin/bash"]
CMD ["docker-entry.sh"]