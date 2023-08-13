const {Sequelize} = require("sequelize");

const sequelize =new Sequelize(
    "threads",
    "pavan",
    "Pavan@7077",{
        dialect:"mysql",
        host:"localhost"
    }
);

const connectToDb =async ()=>{
    try{
        await sequelize.authenticate();
        console.log("Connected with the database successfully");
    }
    catch(error){
        console.log(error);
    }
}


module.exports  = {
    sequelize,
    connectToDb
}
