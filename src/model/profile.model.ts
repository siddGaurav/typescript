import { DataTypes, Model } from "sequelize";
import {sequelize} from '../config/db.js'




interface ProfileUser {
  id: number;
  user_id: number;
  address: string;
  city: string;      
  state: string;
  zipcode: string;
  country: string;
  phoneNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class profileDetails extends Model<ProfileUser> implements ProfileUser{

public id!:number;
public user_id!: number;
public address!:string;
public state!:string;
public  city!: string; 
public zipcode!:string;
public country!:string;
public phoneNumber!: string;
  public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
profileDetails.init(
    {
        id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id:{
        type:DataTypes.INTEGER.UNSIGNED,
          allowNull: false,

    },
    address:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    state:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    city:{
        type:DataTypes.STRING(100),
        allowNull:false,
    },
    zipcode:{
        type:DataTypes.STRING(20),
        allowNull:false,
    },
    country:{
        type:DataTypes.STRING(100),
        allowNull:false,
    },
    phoneNumber:{
        type:DataTypes.STRING(20),
        allowNull:false
    },
    },
    {
   sequelize,
    tableName: "profile_details",
    modelName: "ProfileDetails",
    timestamps: true,
  }
)




