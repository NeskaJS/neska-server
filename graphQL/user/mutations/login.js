import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default function(app) {
  const login = {
    type: new GraphQLObjectType({
      name: 'LoginResult',
      fields: () => ({
        token: { type: GraphQLString },
      }),
    }),
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: app.services.user.loginResolve,
  };

  return login;
}
