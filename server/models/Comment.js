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
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    Comment.associate = models => {
        Comment.belongsTo(models.User, { foreignKey: 'userid', as: 'user' })
    }
    return Comment;
 }