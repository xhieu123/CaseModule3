import connection from "../connection.js";


class UserService {
    constructor() {
        connection.connecting();
    }

    findAll() {
        return new Promise((resolve, reject) => {
            connection.getConnection().query('SELECT * FROM quanlybanhang.products;', (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })
        })
    }
    addCart(product) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`INSERT INTO carts (productId, quantity , userId) VALUES ('${product.productId}', 1, 1);`, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    console.log('them san pham vao gio hang thanh cong')       
                    resolve(data)
                }
            })
        })

    }

    showAll() {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`SELECT * FROM products JOIN carts ON products.id = carts.productId`, (err, data) => {
                if (err) {
                    reject(err)
                } else {    
                    resolve(data)
                }
            })
        })
    }

    deleteId(id) {
        return new Promise((resolve, reject) => {
            console.log(id);
            connection.getConnection().query(`DELETE FROM carts WHERE id = ${id} `, (err, cart) => {
                if (err) {
                    reject(err)
                } else {
                    console.log(`xóa thành công!`)
                    resolve(cart)
                }
            })          
        })
    }
    signUp(user){
        return new Promise((resolve,reject)=>{
            connection.getConnection().query(`INSERT INTO users (\`userName\`, \`passWord\`) VALUES ('${user.username}','${user.password}')`,(err,data)=>{
                if (err){
                    console.log(err)
                    reject(err)
                }else {
                    resolve(data)
                }
            })
        })
    }
    signIn(user){
        return new Promise((resolve,reject)=>{
            connection.getConnection().query(`select * from users where userName = '${user.username}' and passWord = '${user.password}'`,(err,data)=>{
                if (err){
                    reject(err)
                }else {
                    resolve(data)
                }
            })
        })
    }
}


export default new UserService();
