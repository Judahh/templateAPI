import { request } from '@backapirest/any';
import dbHandler from '../../../dBHandler';
import Index from '../../../routes';
export default async (...args) => {
  return await request(args, Index as any, dbHandler, 'sample');
};
