import bcrypt from 'bcrypt-nodejs';
import { createToken } from '../../utils';

function ServiceFactory({ models }) {
  return async function loginResolve(parent, args) {
    const user = await models.user.findOne({
      where: {
        email: args.email,
      },
    });

    if (user === null) {
      throw new Error('User with this email and password does not exists.');
    }

    if (!bcrypt.compareSync(args.password, user.password)) {
      throw new Error('User with this email and password does not exists.');
    }

    const token = createToken({ user_id: user.id, role: user.role });

    return { token };
  };
}

export default ServiceFactory;
