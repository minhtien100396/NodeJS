import db from '../models/index';
import CRUDService from '../services/CRUDService';
//  một function lúc nào ta cũng truyền vào 2 tham số
// đổi với express  ta phải truyền vào 2 tham số: req, res
let getHomePage = async (req, res) => {
    // Chỉ cần khai báo tên view nó sẽ tự mapping đến đối tượng view tương ứng
    // đã được khai báo trong view engine
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data) // chuyển chuỗi JSON thành chuỗi string
        });
    } catch (e) {
        console.log(e);
    }

}

let getHomeAbout = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud from server');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD', {
        dataTable: data,
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        //check user data not found


        return res.render('editCRUD.ejs', {
            userData: userData,
        });
    } else {
        return res.send('userid not found');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDService.updateUser(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUser
    });

}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let allUser = await CRUDService.deleteUser(userId);
        return res.render('displayCRUD.ejs', {
            dataTable: allUser
        });
    } else {
        return res.send('User not found')
    }

}

//một object lúc nào cũng có key và value
// object: {
//     key:'',
//     value:''
// }
module.exports = {
    getHomePage: getHomePage,
    getHomeAbout: getHomeAbout,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}