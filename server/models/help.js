module.exports = (sequelize, DataTypes) => {
    const Help = sequelize.define("Help", {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false
        },
        make: {
            type: DataTypes.STRING,
            allowNull: false
        },
        license_no: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return Help
}