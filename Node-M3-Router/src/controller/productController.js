import fs from "fs";
import productService from "../service/productService.js";
import qs from "qs";
import url from "url";

class ProductController {

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
                productService.save(data).then(() =>{
                  showList(req, res);  
                })
                
            }
        })
    }

    showFormEdit(req, res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end', () => {
            let urlObject = url.parse(req.url, true)
            // console.log(req.method);
            if (req.method == 'GET') {
                fs.readFile('view/product/edit.html', 'utf-8', (err, stringHTML) => {
                    productService.findById(urlObject.query.idEdit).then((product) => {
                        stringHTML = stringHTML.replace('{id}', product.id);
                        stringHTML = stringHTML.replace('{name}', product.name);
                        stringHTML = stringHTML.replace('{price}', product.price);
                        stringHTML = stringHTML.replace('{quantity}', product.quantity);
                        stringHTML = stringHTML.replace('{image}', product.image);
                        res.write(stringHTML);
                        res.end();
                    });
                })
            } else {
                data = qs.parse(data);
                productService.update(data).then(() => {
                    res.writeHead(301, {'location': '/products'}) // chuyển url = js;
                    res.end()
                });
            }
        })
    }

    showFormAdd(req, res) {
        fs.readFile('view/product/add.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }

    delete(req, res) {
        let urlObject = url.parse(req.url, true)
                productService.deleteId(urlObject.query.idDelete).then(() => {    
                    res.writeHead(301, {'location': '/products'});
                    res.end()
                });
}

}

function showList(req, res) {
    fs.readFile('view/product/list.html', 'utf-8', (err, stringHTML) => {
        let str = '';
        productService.findAll().then((products)=> {
            for (const product of products) {
                str+=`<div class="col-lg-3 col-sm-6 my-3">
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
                            <div class="delete-edit">
                                <a href="/edit-product?idEdit=${product.id}"><button>Edit</button></a>
                                <a href="/delete-product?idDelete=${product.id}"><button>delete</button></a>                            
                            </div>
                        </div>
                    </div> 
            </div>`
            }
            stringHTML = stringHTML.replace('###list###', str)
            res.write(stringHTML);
            res.end();
        })
    })
}

export default new ProductController();
