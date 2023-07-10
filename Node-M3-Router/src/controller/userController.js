import fs from "fs";
import qs from "qs";
import url from "url"
import userService from "../service/userService.js";


class UserController {
    showAll(req, res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end',  () => {
            if (req.method === 'GET') {
                showList(req, res);
            } else {
                data = qs.parse(data);
               userService.save(data).then(() =>{
                  showList(req, res);  
                })
                
            }
        })
    }
    
    showErr(req, res) {
        fs.readFile('view/err.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }

    addCart(req, res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end',  () => {
            if (req.method === 'POST') {
                data = qs.parse(data);
                userService.addCart(data)
                console.log('add sp thanh cong');
                showList(req, res);
            }
        })
    }

    showCart(req, res) {
        fs.readFile('view/user/cart.html', 'utf-8', (err, stringHTML) => {
            let str = '';
            let totalPrice = 0;
            userService.showAll().then((carts)=> {
                for (const cart of carts) {
                totalPrice += cart.price * cart.quantity;
                   str += `<tr>
                        <td>
                            <img src="${cart.image}" class="img-fluid">
                            ${cart.name}
                        </td>
                        <td>
                            ${cart.price}$
                        </td>
                        <td>
                            <input type="number" min="1" value="${cart.quantity}">
                        </td>
                        <td>
                            ${cart.price}$
                        </td>
                        <td>
                        <a href="/delete-cart?idDelete=${cart.id}"><button class="btn btn-link text-danger"><i class="fas fa-times"></i></button> </a>
                        </td>
                    </tr>`
                }
                stringHTML = stringHTML.replace('###totalPrice###', totalPrice)
                stringHTML = stringHTML.replace('###product###', str)
                res.write(stringHTML);
                res.end();
            })
        })
    }
    deleteCart(req, res) {
        let urlObject = url.parse(req.url, true)
        console.log(urlObject);
                userService.deleteId(urlObject.query.idDelete).then(() => {    
                    res.writeHead(301, {'location': '/show-cart'});
                    res.end()
                });
    }
    signUp(req,res){
        let data = '';
        fs.readFile('view/user/signUp.html','utf-8',(err,stringHtML)=>{
            if (req.method === 'GET'){
                res.write(stringHtML);
                res.end();
            }else {
                req.on('data',dataRaw =>{
                    data += dataRaw;
                })
                req.on('end',()=>{
                    data = qs.parse(data)
                    userService.signUp(data).then(()=>{
                        res.writeHead(301,{Location:'/sign-in'})
                        res.end();
                    }).catch((err)=>{
                        console.log(1)
                        fs.readFile('./view/user/signUp.html','utf-8',(err,stringHTML)=>{
                            stringHTML = stringHTML.replace('<h1 style="display: none">{err}</h1>', '<h1>Tai khoan da ton tai</h1>');
                            res.write(stringHTML);
                            res.end();
                        })
                    })
                })
            }
        })
    }

    signIn(req, res) {
        let data = ''
        req.on('data', dataRaw => {
            data += dataRaw
        })
        req.on('end', () => {
            if (req.method === 'GET') {
                fs.readFile('view/user/signIn.html', 'utf-8', (err, stringHTML) => {
                    res.write(stringHTML);
                    res.end();
                })
            } else {
                data = qs.parse(data)
                userService.signIn(data).then((result) => {
                    if (result.length !== 0) {
                        if (result[0].userName === 'admin') {
                            fs.readFile('./view/product/list.html', 'utf-8', (err, stringHTML) => {
                                res.write(stringHTML);
                                res.end();
                            })
                            // res.writeHead(301, {Location: '/'})
                            // res.end();
                        } else {
                            showList(req, res)
                            // fs.readFile('./view/user/list.html', 'utf-8', (err, stringHTML) => {
                            //     res.write(stringHTML);
                            //     res.end();
                            // })
                        }
                    }else {
                        fs.readFile('./view/user/signIn.html','utf-8',(err,stringHTML)=>{
                            stringHTML = stringHTML.replace('<h1 style="display: none">{err}</h1>','<h1>Sai thong tin dang nhap</h1>')
                            res.write(stringHTML);
                            res.end();
                        })
                    }
                })
            }
        })
    }
}
function showList(req, res) {
    fs.readFile('view/user/list.html', 'utf-8', (err, stringHTML) => {
        let str = '';
        userService.findAll().then((products)=> {
            for (const product of products) {
                str += `<div class="col-lg-3 col-sm-6 my-3">
                        <form action="/add-cart" method="POST">
                            <div class="col-12 bg-white text-center h-100 product-item">
                                <div class="row h-100">
                                    <div class="col-12 p-0 mb-3">
                                        <a href="product.html">
                                            <img src="${product.image}" class="img-fluid">
                                        </a>
                                    </div>
                                    <div class="col-12 mb-3">
                                        <a href="product.html" class="product-name">${product.name}</a>
                                    </div>
                                    <div class="col-12 mb-3">
                                        <span class="product-price">
                                        ${product.price}$
                                        </span>
                                    </div>
                                    <input name="productId" type="hidden" value="${product.id}"/>
                                    <div class="col-12 mb-3 align-self-end">
                                        <button class="btn btn-outline-dark" type="submit" onclick="addToCart(${product.id})">
                                        <i class="fas fa-cart-plus me-2"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>`
            }
            stringHTML = stringHTML.replace('{###list###}', str)
            res.write(stringHTML);
            res.end();
        })
    })
}
export default new UserController();
