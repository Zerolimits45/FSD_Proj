module.exports = (sequelize, DataTypes) => {
    const Help = sequelize.define("Help", {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:false
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
    })
    return Help
}