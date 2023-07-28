module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define("Feedback", {
        feedback: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bookingid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })
    Feedback.associate = models => {
        Feedback.belongsTo(models.Booking, { foreignKey: 'bookingid', as: 'booking' })
    }
    return Feedback
}