module.exports = (sequelize, DataTypes) => {
    const Request = sequelize.define("Request", {
        request: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bookingid: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        carid: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    })
    Request.associate = models => {
        Request.belongsTo(models.Booking, { foreignKey: 'bookingid', as: 'booking' })
        Request.belongsTo(models.Car, { foreignKey: 'carid', as: 'car' })
    }

    return Request
}