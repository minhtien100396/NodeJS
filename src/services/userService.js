import db from "../models/index";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);


let handleUserLoggin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    //attributes: chi lay 3 truong
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    // bcrypt.compareSync("not_bacon", hash); 
                    let checkPassword = await bcrypt.compareSync(password, user.password);
                    if (checkPassword) {
                        userData.errCode = 0;
                        userData.errMessage = `OK`;
                        delete user.password;
                        userData.user = user
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong Password!`
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not fount!`
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exits in your system. Plz try other email!`

            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true);
            } {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId && userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },

                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    users
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    },
                })
                if (!users) {
                    resolve({
                        errCode: 3,
                        errMessage: 'User Not Found'
                    })
                } else {
                    resolve({
                        errCode: 0,
                        errMessage: 'OK',
                        users
                    })
                }
            }

        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        //check email exíst
        let check = await checkUserEmail(data.email.trim());
        if (check === true) {
            resolve({
                errCode: 1,
                errMessage: 'Your email is already in used, Plz try another email!'
            })
        } else {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            try {
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId
                });
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            } catch (e) {
                reject(e);
            }
        }
    })

}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: idUser },

            });
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`
                })
            }
            // await foundUser.destroy(); : dùng theo instance của sequelize( araw = false)
            await db.User.destroy({
                where: { id: idUser }
            })
            resolve({
                errCode: 0,
                errMessage: `The user is delete`
            })
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) => {

    return new Promise(async (resolve, reject) => {
        if (!data.id) {
            resolve({
                errCode: 2,
                errMessage: `Missing required parameters`
            })
        } else {
            try {
                let user = await db.User.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (user) {
                    console.log(user);
                    user.firstName = data.firstName;
                    user.lastName = data.lastName;
                    user.address = data.address;

                    await user.save();
                    resolve({
                        errCode: 0,
                        errMessage: `Update the user succeeds`
                    })
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: `User's not found!`
                    })
                }
            } catch (e) {
                reject(e);
            }
        }

    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let res = {};
                let allCode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.data = allCode;
                resolve(allCode);
            }
        } catch (e) {
            reject(e);
        }

    })
}


module.exports = {
    handleUserLoggin: handleUserLoggin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
}