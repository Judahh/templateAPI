import { Handler, MongoPersistence } from 'flexiblepersistence';

import { DatabaseHandler } from 'backapi';
import { Journaly, SenderReceiver } from 'journaly';
import { ServiceHandler } from '@flexiblepersistence/service';
import {
  getEventDatabase,
  getReadDatabase,
} from '@flexiblepersistence/database-info';

{{ tmplr.database_import }}

import SampleService from './services/sampleService';

const journaly = Journaly.newJournaly() as SenderReceiver<any>;
const readDatabase = getReadDatabase(journaly);
const eventDatabase = getEventDatabase(journaly);

{{ tmplr.database_sql }}

{{ tmplr.database_var }}

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
