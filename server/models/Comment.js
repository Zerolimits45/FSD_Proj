module.exports = (sequelize, DataTypes) =>{
    const Comment = sequelize.define("Comment", {
        description: {
         type: DataTypes.TEXT,
         allowNull: false
        },
        discussionid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    Comment.associate = models => {
        Comment.belongsTo(models.Discussion, { foreignKey: 'discussionid', as: 'discussion' })
    }
    return Comment;
 }