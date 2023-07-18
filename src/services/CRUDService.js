const bcrypt = require('bcrypt');
import { raw } from 'body-parser';
import db from '../models/index';

const saltRounds = 10;

let createNewUser = async (data) => {
    try {
        let hashedPassword = await hashPassword(data.password);
        await db.User.create({
            email: data.email,
            password: hashedPassword,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phonenumber: data.phonenumber,
            gender: data.gender === '1' ? true : false,
            roleId: data.roleId
        });
        return 'New user successfully created';
    } catch (error) {
        throw error;
    }
};

let hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};

let getAllUsers = () => {
    return new Promise((resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
       } catch (error) {
            reject(error);
       }
    })
}
let getUserInforById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try{
            console.log(userId);
            let user = await db.User.findOne(
                { 
                  where: { id: userId }, 
                  raw: true, 
                });
            resolve(user);

        }catch (error) {
            reject({});
        }

    });

}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let userId = data.id;
        let {...updatedData } = data;
        await db.User.update(updatedData, { where: { id: userId } });

        let allUsers = await db.User.findAll({raw: true});
        console.log('User data updated successfully');
        resolve(allUsers); 
      } catch (error) {
        reject(error); 
      }
    });
  };
  
  

module.exports = {
    createNewUser, 
    getAllUsers,
    getUserInforById,
    updateUserData
};
