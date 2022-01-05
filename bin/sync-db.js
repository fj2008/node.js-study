//db 싱크하는 모델

const models = require('./models');

module.exports = () => {
    return models.sequelize.sync({ force: true });
};
