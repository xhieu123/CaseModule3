import fs from "fs";
import productService from "../service/productService.js";

class HomeController {
    showIndex(req, res) {
        fs.readFile('view/index.html', 'utf-8', (err, stringHTML) => {
            let str = '';
            productService.findAll().then((products)=> {
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
                stringHTML = stringHTML.replace('###list###', str)
                res.write(stringHTML);
                res.end();
            })
        })
    }

    
    showErr(req, res) {
        fs.readFile('view/err.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }
}

export default new HomeController();
