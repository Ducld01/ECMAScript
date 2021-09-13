

import axios from 'axios';
import ProductApi from "../api/productAPI";
import { parseRequestUrl, $ } from "../utils";
import CategoryAPI from "../api/categoryAPI.js"


const ProductDetailPage = {
    async render() {
        const { id } = parseRequestUrl();
        const { data: product } = await ProductApi.get(id);
        const { data: categories } = await CategoryAPI.getAll();
        // console.log(response);
        // console.log(product);

        // const products = await response.data;
        // // const { id } = parseRequestUrl();
        // const product = products.find( product => product.id == id);
        return /*html*/ `<div class="container">
        <div class="row">
            <div class="col-sm-3">
                <div class="left-sidebar">
                    <h2>Category</h2>
                    <div class="panel-group category-products" id="accordian">
                        <!--category-productsr-->
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                <a class="collapsed d-flex justify-content-between h3 text-decoration-none" href="#">
                                ${categories.map(category => {
            return `<li><a class="dropdown-item" href="/#/category/${category.id}">${category.name}</a></li>`
        }).join("")
            }
                            </a>
                                </h4>
                            </div>
                           
                        </div>
                    </div>
                    <!--/category-products-->
                </div>
            </div>

            <div class="col-sm-9 padding-right">
                <div class="product-details">
                    <!--product-details-->
                    <div class="col-sm-5">
                        <div class="view-product">
                            <img src="http://localhost:5000/api/product/photo/${product._id}" alt="" />

                        </div>
                    </div>
                    <div class="col-sm-7">
                        <div class="product-information">
                            <h2>${product.name}</h2>
                            <p>Web ID: 1089772</p>
                            <span>
                                <span>${product.price}</span>
                                <label>Quantity:</label>
                                <input type="text" value="1" />
                                <button type="button" class="btn btn-fefault cart" name="submit" id="add-cart" data-id="${product.id}" value="addtocard">
                                    <i class="fa fa-shopping-cart"></i>
                                    Add to cart
                                </button>
                            </span>
                            <p><b>Availability:</b>${product.status ? "Còn hàng" : "Hết hàng"}</p>
                            <p><b>Condition:</b> New</p>
                            <p><b>Brand:</b> 67-Fway</p>
                        </div>
                        <!--/product-information-->
                    </div>
                </div>
                <!--/product-details-->



            </div>
        </div>
    </div>
        `

    },
    afterRender() {
        // let carts = $('#add-cart');
        // carts.addEventListener('click', btn => {
        //     console.log(btn.target.dataset.id);
        // });
        const cartBtn = $("#add-cart");
        let cart = localStorage.getItem('cart');
        cart = cart != null ? JSON.parse(cart) : [];

        // cartBtn.forEach(btn => {
        cartBtn.addEventListener("click", async event => {
            // console.log(event.target.dataset.id);
            let existed = cart.map(oca => oca.id).indexOf(event.target.dataset.id);
            console.log(existed);
            if (existed == -1) {
                const { data: product } = await ProductApi.get(event.target.dataset.id);
                product.quantity = 1;
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));
            } else {
                cart[existed].quantity += 1;
                localStorage.setItem('cart', JSON.stringify(cart));
            }
            let lengthcart = 0;

            cart.forEach(element => {
                lengthcart += element.quantity;
            });
            // console.log(lengthcart);
            $("#quantity-cart").innerHTML = lengthcart;

        });
        // });
    }
}

export default ProductDetailPage;