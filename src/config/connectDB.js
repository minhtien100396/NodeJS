const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
// hoidanit: tên db, root: usernameDB, null: passDB
const sequelize = new Sequelize('hoidanit', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    // không hiển thị ra câu SELECT
    logging: false
});
// async - await : đi với nhau để nói đây là hàm bất đồng bộ
// bởi vì kết nối tới  DB mất tgian nên phải sử dụng bất đồng bộ để xử lý
let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;
