import bcrypt from 'bcryptjs';
import { raw } from 'body-parser';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === 1 ? true : false,  //1: true , 0:false
                roleId: data.roleId,
            });
            resolve('OK create a new user succeed');
        } catch (e) {
            reject(e);
        }
    });
}

let hashUserPassword = (password) => {
    // resolve : thành công
    // reject : thất bại
    // chỗ nào bất đồng bộ thì sử dụng cặp async và await
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                // chỉ trả ra array
                raw: true,
            });
            resolve(users);
        }
        catch (e) {
            reject(e);
        }
    })

}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            });
            if (user) {
                resolve(user);
            } else {
                resolve({});
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw:false
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }
        } catch (e) {
            console.log(e);
        }
    });
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = {}
        try {
            user = await db.User.findOne({
                where: { id: userId },
                raw:false
            });

            if (user) {
                await user.destroy();
                let allUser = await db.User.findAll();
                resolve(allUser);
            } else {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`
                }); //return
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUser: updateUser,
    deleteUser: deleteUser,
}