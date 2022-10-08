const gql = require('graphql-tag');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { typeDefs: gqlScalarTypeDefs } = require('graphql-scalars');

const character = require('./character');
const location = require('./location');
const pagination = require('./pagination');

module.exports = mergeTypeDefs([
  gqlScalarTypeDefs,
  gql`
    type Query {
      hello: String
    }
  `,
  character,
  location,
  pagination,
]);
