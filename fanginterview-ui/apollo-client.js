import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    // uri: "http://localhost:10010/graphql",
    uri: `${process.env.graphql_endpoint}`,
    cache: new InMemoryCache(),
});

export default client;
