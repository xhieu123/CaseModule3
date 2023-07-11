import fs from 'fs'
import userController from "../controller/userController.js";

let userRouter = {
    '/users': userController.showAll,
    '/add-cart': userController.addCart,
    '/show-cart': userController.showCart,
    '/delete-cart': userController.deleteCart,
    '/sign-in': userController.signIn,
    '/sign-up': userController.signUp,
    '/search-user' : userController.searchProduct,
}

export default userRouter;
