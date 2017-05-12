function ServiceFactory({ models }) {
  return async function updateUserResolve(parent, args) {
    const user = await models.user.findOne({ where: { email: args.email } });

    if (!user) {
      throw new Error('A user with this email not exists.');
    }

    user.destroy();

    return { user, errors: [] };
  };
}

export default ServiceFactory;
