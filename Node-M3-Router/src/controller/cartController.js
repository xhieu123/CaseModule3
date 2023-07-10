// import fs from "fs";
// import qs from "qs";
// import cartService from "../service/cartService.js";

// class CartController {
//     addCart(req, res) {
//         let data = '';
//         req.on('data', dataRaw => {
//             data += dataRaw;
//         })
//         req.on('end',  () => {
//             if (req.method === 'POST') {
//                 data = qs.parse(data);
//                 cartService.addCart(data)
//                 console.log('add sp thanh cong');
//             }
//         })
//     }

//     showCart(req, res) {
//         fs.readFile('view/user/cart.html', 'utf-8', (err, stringHTML) => {
//             let str = '';
//             let totalPrice = 0;
//             cartService.showAll().then((carts)=> {
//                 console.log(carts);
//                 for (const cart of carts) {
//                 totalPrice += cart.price * cart.quantity;
//                    str += `                                            <tr>
//                         <td>
//                             <img src="${cart.image}" class="img-fluid">
//                             ${cart.name}
//                         </td>
//                         <td>
//                             ${cart.price}$
//                         </td>
//                         <td>
//                             <input type="number" min="1" value="${cart.quantity}">
//                         </td>
//                         <td>
//                             ${cart.price}$
//                         </td>
//                         <td>
//                             <button class="btn btn-link text-danger"><i class="fas fa-times"></i></button>
//                         </td>
//                     </tr>`
//                 }
//                 stringHTML = stringHTML.replace('###totalPrice###', totalPrice)
//                 stringHTML = stringHTML.replace('###product###', str)
//                 res.write(stringHTML);
//                 res.end();
//             })
//         })
//     }
// }

// export default new CartController();
