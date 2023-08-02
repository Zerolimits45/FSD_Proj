 module.exports = (sequelize, DataTypes) =>{
    const Discussion = sequelize.define("Discussion", {
        title: {
         type: DataTypes.STRING,
         allowNull: false
        },
        description: {
         type: DataTypes.TEXT,
         allowNull: false
        }
    });
    Discussion.associate = models => {
        Discussion.hasMany(models.Comment, { foreignKey: 'discussionid', onDelete: 'cascade' })
    }

    return Discussion;
 }