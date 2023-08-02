module.exports = (sequelize, DataTypes) => {
    const Discussion = sequelize.define("Discussion", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        commentsCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    Discussion.associate = models => {
        Discussion.hasMany(models.Comment, { foreignKey: 'discussionid', onDelete: 'cascade' })
        Discussion.belongsTo(models.User, { foreignKey: 'userid', as: 'user'})
    }

    return Discussion;
}