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
    })
    return Feedback
}