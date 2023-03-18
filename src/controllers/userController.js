import userService from "../services/userService";

let handleLoggin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    //!email: bang rong || bang null || bang underfine
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing inputs parameter!'
        })
    }
    let userData = await userService.handleUserLoggin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let getAllUsers = async (req, res) => {
    let id = req.query.id; // Type: có 2 kiểu All,id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required paramter',
            users: []
        })
    }

    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: users.errCode,
        errMessage: users.errMessage,
        users: users.users
    })
}

let handleCreateNewUser = async (req, res) => {
    let formCreate = req.body;
    let message = await userService.createNewUser(formCreate);
    return res.status(200).json({
        message
    })
}


let handleDeleteUser = async (req, res) => {
    let idUser = req.body.id;
    if (!idUser) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await userService.deleteUser(idUser);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    })
}

let handleEditUser = async (req, res) => {
    let userData = req.body;
    let message = await userService.updateUserData(userData);
    return res.status(200).json({
        errCode: message.errCode,
        errMessage: message.errMessage
    })

}

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json({
            data,
            errCode: 0,
            errMessage: 'OK'
        })
    } catch (e) {
        console.log('get all code error: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }

}
module.exports = {
    handleLoggin: handleLoggin,
    getAllUsers: getAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,
}