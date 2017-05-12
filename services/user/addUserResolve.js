import bcrypt from 'bcrypt-nodejs';

function ServiceFactory({ models }) {
  return async function addUserResolve(parent, args) {
    let user;

    user = await models.user.findOne({ where: { email: args.email } });

    if (user) {
      throw new Error('User with this email exists.');
    }

    if (!['admin', 'editor', 'viewer'].includes(args.role)) {
      throw new Error('Role not permitted.');
    }

    user = await models.user.create({
      email: args.email,
      lastname: args.lastname,
      name: args.name,
      password: bcrypt.hashSync(args.password),
      role: args.role,
    });

    return { user, errors: [] };
  };
}

export default ServiceFactory;
