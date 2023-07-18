import express from "express"
import homeController from "../controllers/homeController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/test', (req, res) => {
        return res.send('Hello ste')
    });
    router.get('/crud',homeController.getCRUD);
    router.post('/post-crud',homeController.postCRUD);
    router.get('/display-crud',homeController.displayGetCRUD);


    return app.use("/", router);
}

module.exports = initWebRoutes;