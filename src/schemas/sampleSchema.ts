import { BaseSchemaDefault } from 'flexiblepersistence';
import { Schema, SchemaDefinition } from 'mongoose';

export default class SampleSchema extends BaseSchemaDefault {
  generateName(): void {
    this.setName('Sample');
  }

  protected attributes: SchemaDefinition = {
    // Model attributes are defined here
    id: {
      type: Schema.Types.ObjectId,
      unique: true,
      index: true,
      required: true,
    },
    name: Schema.Types.String,
  };

  protected options = {
    strict: true,
    strictPopulate: true,
    id: true,
    versionKey: false,
  };
}
