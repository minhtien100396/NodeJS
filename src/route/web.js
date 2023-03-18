import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
let router = express.Router();

let initWebRoutes = (app) => {
    //app: ứng dụng của server
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getHomeAbout);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    router.post('/api/login', userController.handleLoggin);
    router.get('/api/get-all-users', userController.getAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/allcode', userController.getAllCode);


    //rest api
    router.get('/hoidanit', (req, res) => {
        return res.send('Hỏi Dân IT');
    });
    return app.use("/", router);
}

module.exports = initWebRoutes;
