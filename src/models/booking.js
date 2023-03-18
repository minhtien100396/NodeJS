'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Booking.init({
        // Không cần khai báo primary key
        statusID: DataTypes.STRING,
        doctorID: DataTypes.INTEGER,
        patientID: DataTypes.INTEGER,
        date: DataTypes.DATE, // Mặc định Date là Timestamp Nên lưu kiểu Timestamp: mã hóa ngày tháng thành số và để định dạng được '-' or '/'
        timeType: DataTypes.STRING,  //1: true , 0:false
    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};