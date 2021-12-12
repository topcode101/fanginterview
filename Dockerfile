FROM ubuntu:18.04
SHELL ["/bin/bash", "-c"] 

# install system-wide deps for python and node
RUN apt-get update && apt-get install -y \
  curl \
  ssh \
  git


# Install nvm with node and npm
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 14.18.1
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

ENV NODE_ENV production
# Create app directory
WORKDIR /usr/src/app
# RUN mkdir dist
# COPY package*.json ./
# RUN npm install
# COPY --from=builder /usr/src/app/dist ./dist

# # git ssh keys
# # need to run setup.sh before build image
# RUN mkdir -p /root/.ssh
# RUN ssh-keyscan bitbucket.org >> /root/.ssh/known_hosts
# COPY id_rsa_for_docker /root/.ssh/id_rsa
# RUN chmod 400 /root/.ssh/id_rsa

EXPOSE 3000
CMD [ "prod_start_all.sh"]
