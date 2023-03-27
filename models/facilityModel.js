module.exports = (sequelize,DataTypes)=>{

    const Facility = sequelize.define("facility",{
        name:{
            type: DataTypes.STRING,
            allowNull:false
        },
        phone:{
            type: DataTypes.STRING
        },
        city:{
            type: DataTypes.STRING
        }

    }

    )
    return Facility;
}