import { BaseDAO } from '@flexiblepersistence/dao';

export default class SampleDAO extends BaseDAO {
  generateName(): void {
    this.setName('Samples');
  }
}
