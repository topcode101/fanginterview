const { gql } = require('apollo-server');

// const typeDefs = gql`
//   type Launch {
//     id: ID!
//     site: String
//     mission: Mission
//     rocket: Rocket
//     isBooked: Boolean!
//   }
//   type Rocket {
//     id: ID!
//     name: String
//     type: String
//   }
  
//   type User {
//     id: ID!
//     email: String!
//     trips: [Launch]!
//     token: String
//   }
  
//   type Mission {
//     name: String
//     missionPatch(size: PatchSize): String
//   }
  
//   enum PatchSize {
//     SMALL
//     LARGE
//   }

//   type Query {
//     launches: [Launch]!
//     launch(id: ID!): Launch
//     me: User
//   }

//   type Mutation {
//     bookTrips(launchIds: [ID]!): TripUpdateResponse!
//     cancelTrip(launchId: ID!): TripUpdateResponse!
//     login(email: String): User
//   }

//   type TripUpdateResponse {
//     success: Boolean!
//     message: String
//     launches: [Launch]
//   }
// `;

const typeDefs = gql`
  enum UserSource {
    NORMAL
    GOOGLE
    FACEBOOK
  }
  type User {
    id: String!
    username: String!
    email: String!
    source: UserSource
  }

  type Query {
    "A simple type for getting started!"
    hello: String
    currentUser: User
  }

  type LoginResult {
    user: User,
    token: String!
  }

  type Mutation {
    signup (username: String!, email: String!, password: String!): String
    login (source: UserSource!, email: String, password: String, googleIdToken: String): LoginResult
  }
   
`;

export default typeDefs;
