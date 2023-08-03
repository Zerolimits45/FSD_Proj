module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['customer', 'staff', 'admin']]
            }
        }
    })

    User.associate = models => {
        User.hasMany(models.Car, { foreignKey: 'userid', onDelete: 'cascade' })
        User.hasMany(models.Booking, { foreignKey: 'userid', onDelete: 'cascade' })
        User.hasMany(models.Discussion, { foreignKey: 'userid', onDelete: 'cascade' })
        User.hasMany(models.Comment, { foreignKey: 'userid', onDelete: 'cascade' })
    }

    return User
}