module.exports = (sequelize, DataTypes) => {
    const Help = sequelize.define("Help", {
        name: {
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
    })
    Help.associate = models => {
        Help.belongsTo(models.User, { foreignKey: 'userid', as: 'user' })
    }

    return Help
}