import mongoose from 'mongoose';
import path from 'path';
import { eachFileIn } from '../utils';

mongoose.Promise = global.Promise;
const options = { promiseLibrary: global.Promise };
const db = mongoose.connection;

mongoose.connect(`mongodb://${process.env.db_mongo}`, options);
if (process.env.NODE_ENV !== 'production') mongoose.set('debug', true);

db.on('error', err => console.log('error', 'MongoDB connection error', err)); // eslint-disable-line no-console

export default function(app) {
  app.models = app.models || {}; // eslint-disable-line no-param-reassign

  eachFileIn(path.join(__dirname, 'models'), (file) => {
    if (file.substr(file.length - 3) === '.js') {
      const modelName = file.replace('.js', '');
      const schema = mongoose.Schema(require('./models/' + file).default(app), // eslint-disable-line
        { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
      app.models[modelName] = mongoose.model(modelName, schema); // eslint-disable-line no-param-reassign
    }
  });

  return app.models;
}
