import { BaseSchemaDefault } from 'flexiblepersistence';
import { Schema, SchemaDefinition } from 'mongoose';

export default class SampleSchema extends BaseSchemaDefault {

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
    strict: false,
    strictPopulate: false,
    id: true,
    versionKey: false,
  };
}
