const createError = require('http-errors');
import express, {Request, Response} from 'express';
//const express = require('express');
import config from '../../config';
import DynamicLoader from '../../utils/DynamicLoader';
import fs from 'fs';
const cookies = require('cookie-parser');

const path = require('path');
import { ApolloServer } from 'apollo-server-express';
import typeDefs from '../../GQL/schema';
import resolvers from '../../GQL/resolvers';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

/**
 * ApolloServer
 */
class ApolloGQLServer {
  app: object
  expressApp: any
  httpServer: any
  //expressApp: Express.Application  //todo: shoud it be like express ? 

  /**
   *
   * @param {*} app
   */
  constructor(app, expressApp, httpServer) {
    this.app = app;
    this.expressApp = expressApp;
    this.httpServer = httpServer;
  }

  async initialization() {
    // Same ApolloServer initialization as before, plus the drain plugin.
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer })],
        context: ({ req }) => {
            // Note: This example uses the `req` argument to access headers,
            // but the arguments received by `context` vary by integration.
            // This means they vary for Express, Koa, Lambda, etc.
            //
            // To find out the correct arguments for a specific integration,
            // see https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields
            
            // Get the user token from the headers.
            const token = req.headers.authorization || '';
            
            // Try to retrieve a user with the token
            // const user = getUser(token);
            
            // Add the user to the context
            return { 
                app: this.app,
                test: '123123' 
            };
        },
    });

    
    await server.start();
    server.applyMiddleware({
        app: this.expressApp,
   
        // By default, apollo-server hosts its GraphQL endpoint at the
        // server root. However, *other* Apollo Server packages host it at
        // /graphql. Optionally provide this to match apollo-server.
        path: '/graphql'
     });
  }
}


export default ApolloGQLServer;
