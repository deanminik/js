import { DataTypes } from "sequelize"; // Similar to mongoose
import db from "../db/connection";

const User = db.define('User',{
    name:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    state:{
        type:DataTypes.BOOLEAN
    },

});

export default User;

// HERE: -> 

// state:{
//     type:DataTypes.BOOLEAN
// },

// In the database the property state is using TINYINT, that represents: 0 or 1 

//And here we can use BOOLEAN because sequelize will handle those values to transform true or false into 1 or 0