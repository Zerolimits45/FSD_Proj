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
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    })
    Booking.associate = models => {
        Booking.belongsTo(models.User, { foreignKey: 'userid', as: 'user' })
        Booking.belongsTo(models.Car, {foreignKey: 'carid', as: 'car'})
    }
    return Booking
}