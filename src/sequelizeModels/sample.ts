import { BaseModelDefault } from 'flexiblepersistence';
import { DataTypes } from 'sequelize';

export default class Sample extends BaseModelDefault {
  generateName(): void {
    this.setName('Sample');
  }

  protected attributes = {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
    },
  };

  protected options = {
    timestamps: false,
  };
}
