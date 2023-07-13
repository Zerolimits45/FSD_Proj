module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define("Booking", {
        startdate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        enddate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        licencenumber: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    Booking.associate = models => {
        Booking.belongsTo(models.User, { foreignKey: 'userid', as: 'user' })
    }
    return Booking
}