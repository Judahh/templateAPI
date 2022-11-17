import { Handler, MongoPersistence } from 'flexiblepersistence';

import { DatabaseHandler } from 'backapi';
import { Journaly, SenderReceiver } from 'journaly';
import { ServiceHandler } from '@flexiblepersistence/service';
import {
  getEventDatabase,
  getReadDatabase,
} from '@flexiblepersistence/database-info';

import SampleSchema from './schemas/sampleSchema';

import SampleService from './services/sampleService';

// import { PGSQL } from '@flexiblepersistence/pgsql';
// import { MSSQL } from '@flexiblepersistence/mssql';

const journaly = Journaly.newJournaly() as SenderReceiver<any>;
const readDatabase = getReadDatabase(journaly);
const eventDatabase = getEventDatabase(journaly);

// const sql = new PGSQL(readDatabase);
// const sql = new MSSQL(readDatabase);

// const database = new DAOPersistence(sql, {
//   sample: new SampleDAO(),
// });

const database = new MongoPersistence(readDatabase, {
  sample: new SampleSchema(),
});

const read = new ServiceHandler(
  readDatabase,
  {
    sample: new SampleService(),
  },
  database
);
const write =
  eventDatabase === undefined ? undefined : new MongoPersistence(eventDatabase);
const handler = new Handler(write, read);
const dbHandler = DatabaseHandler.getInstance({
  handler: handler,
  journaly: journaly,
}) as DatabaseHandler;

export default dbHandler;
export { write, read, database };
