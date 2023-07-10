import connection from "../connection.js";


class ProductService {
    constructor() {
        connection.connecting();
    }

    findAll() {
        return new Promise((resolve, reject) => {
            connection.getConnection().query('select * from products', (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })
        })
    }

    save(product) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`INSERT INTO products (name,price , quantity, image) VALUES ('${product.name}', ${product.quantity}, ${product.price},'${product.image}');`, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    console.log('them thanh cong')       
                    resolve(data)
                }
            })
        })

    }
    update(product) {
            return new Promise((resolve, reject) => {
                connection.getConnection().query(`UPDATE products SET name = '${product.name}', price = ${product.price}, quantity = '${product.quantity}', image = '${product.image}' WHERE (id = '${product.id}')`, (err, products) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(`Sửa thành công!`)
                        resolve(products)
                    }
                })          
            })
        }
    deleteId(id) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`DELETE FROM products WHERE id = ${id} `, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    console.log(`xóa thành công!`)
                    resolve(products)
                }
            })          
        })
    }
    
    findById(id) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from products where id = ${id}`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products[0])
                }
            })
        })
        
    }
}


export default new ProductService();
