module.exports = (sequelize, DataTypes) => {
    const Help = sequelize.define("Help", {
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
            unique: true,
        }
    })
    return Help
}