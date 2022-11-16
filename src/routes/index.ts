import SampleController from '../controllers/sampleController';

import { RouterSingleton } from '@backapirest/any';
import { IRouter } from 'backapi';

import cors from 'cors';

import Helmet from 'helmet';
import Limit from 'express-rate-limit';

import { Mauth } from '@midware/mauth';

import { limitConfig } from '../configs/limitConfig';

// Initializing the limit middleware
const limit = Limit(limitConfig);

const corsEnabled =
  process.env.CORS_ENABLED?.toLocaleLowerCase() === 'true' ||
  process.env.ALLOWED_ORIGIN === '*';

const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: process.env.ALLOWED_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue:
    process.env.ALLOWED_PREFLIGHT_CONTINUE?.toLocaleLowerCase() === 'true' ||
    false,
  optionsSuccessStatus: process.env.ALLOWED_OPTIONS_SUCCESS_STATUS
    ? +process.env.ALLOWED_OPTIONS_SUCCESS_STATUS
    : 204,
};

export default class Index extends RouterSingleton {
  getNames(array) {
    return array.map((value) => {
      // console.log('value:', value.name);
      return value.name;
    });
  }
  createRoutes(initDefault?: IRouter) {
    //console.log('New ROUTES', mauth);
    if (initDefault) {
      const mauth = new Mauth();
      if (!initDefault.middlewares || initDefault.middlewares.length > 0)
        initDefault.middlewares = [];
      if (corsEnabled) initDefault.middlewares.push(cors(corsOptions));
      initDefault.middlewares.push(Helmet());
      initDefault.middlewares.push(limit);
      const authentication = mauth?.authentication.bind(mauth);
      const permission = mauth?.permission.bind(mauth);

      if (!JSON.parse(process.env.DISABLE_AUTH || 'false')) {
        initDefault.middlewares.push(authentication, permission);
      }

      if (!this.controller) this.controller = {};

      if (!this.controller.sample)
        this.controller.sample = new SampleController(initDefault);
  }
}
