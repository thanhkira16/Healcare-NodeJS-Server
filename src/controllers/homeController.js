import db from '../models/index';
import CRUDCervice from '../services/CRUDService';

// đừng bỏ dấu / 
let getHomePage = async(req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}

let getCRUD = async(req, res) => {
    return  res.render('crud.ejs');
}
let postCRUD = async(req, res) => {
    let message =  await CRUDCervice.createNewUser(req.body);
    console.log(message);
    return res.send('post')
}

let displayGetCRUD = async(req, res) => {
    let data = await CRUDCervice.getAllUsers();
    console.log('--------------------------------');
    console.log(data);
    console.log('--------------------------------');
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async(req, res) => {
    let userId = req.query.id;
    if (userId){
        let userData = await CRUDCervice.getUserInforById(userId);

        if (userData) {
            return res.render('editCRUD.ejs', {
              user: userData
            });
          } else {
            return res.send('User not found');
          }
    }else{
        return res.send('Error: Missing user ID');
    }
}

let putCRUD = async(req, res) => {
    let data = req.body;
    let allUsers = await CRUDCervice.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })
}

module.exports = {
    getHomePage,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD
}