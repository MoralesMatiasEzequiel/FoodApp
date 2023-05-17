const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID(),  // fsdffds-54dd4-dfd5f57
      defaultValue: DataTypes.UUIDV4(),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(),
      allowNull: false, 
    },
    image:{
      type: DataTypes.STRING(),
      validate: {
        isUrl: true
      }
    },
    summary:{
      type: DataTypes.STRING(),
      allowNull: false
    },
    healthScore:{
      type: DataTypes.FLOAT(),
      allowNull: false,
      validate: {
        min: 0,
        max: 100
      }
    },
    steps:{
      type: DataTypes.ARRAY(DataTypes.STRING()),  //Antes: type: DataTypes.ARRAY(DataTypes.STRING()),
      allowNull: false
      // stepBreackdown: DataTypes.BOOLEAN()

    },
    createInBd: {    //Esto me funcionaria a modo de flat que lo cree yo.
      type: DataTypes.BOOLEAN(),
      defaultValue: true,
      allowNull: false
    }
  }, { timestamps: false });
};

