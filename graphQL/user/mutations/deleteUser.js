import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default function(app) {
  const deleteUser = {
    type: new GraphQLObjectType({
      name: 'DeleteUserResult',
      fields: () => ({
        user: { type: app.graphs.user.type },
      }),
    }),
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: app.services.user.deleteUserResolve,
  };

  return deleteUser;
}
