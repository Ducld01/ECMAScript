//import data from '../data.js';
//console.log(data.products);
import axios from 'axios';
import ProductAPI from '../api/productAPI';
import CategoryAPI from '../api/categoryAPI';
const ProductsPage = {
    async render() {
        try {
            const { data: categories } = await CategoryAPI.getAll();
            const { data: products } = await ProductAPI.getAll();
            const result = products.map(product => {
                return /*html*/`    
                        <div class="row">
                            <div class="col-sm-4">
							<div class="product-image-wrapper">
								<div class="single-products">
									<div class="productinfo text-center">
										<img src="http://localhost:5000/api/product/photo/${product._id}" alt="${product.name}" />
										<h2>${product.price}</h2>
										<p>${product.name}</p>
										<a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart" name="submit" id="add-cart" data-id="${product.id}" value="addtocard"></i>Add to cart</a>
									</div>
									<div class="product-overlay">
										<div class="overlay-content">
											<h2>${product.price}</h2>
											<p>${product.name}</p>
											<a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart" name="submit" id="add-cart" data-id="${product.id}" value="addtocard"></i>Add to cart</a>
										</div>
									</div>
								</div>
								<div class="choose">
									<ul class="nav nav-pills nav-justified">
										<li><a href="/#/products/${product._id}"><i class="fa fa-plus-square"></i>Details</a></li>
									</ul>
								</div>
							</div>
						</div>
            
                            </div>
                          
                `;
            }).join("");

            return /*html */ `
                <div class="container py-5">
                    <div class="row">
                        <div class="col-lg-3">
                            <h1 class="h2 pb-4">Categories</h1>
                            <ul class="list-unstyled templatemo-accordion">
                            <li class="pb-3">
                                <a class="collapsed d-flex justify-content-between h3 text-decoration-none" href="#">
                                    ${categories.map(category => {
                return/*html */ `<li><a class="dropdown-item" href="/#/category/${category._id}">${category.name}</a></li>`
            }).join("")
                }
                                </a>
                            </li>
                            </ul>
                        </div>
                        <div class="col-lg-9">
                            <div class="col-sm-9 padding-right">
					            <div class="features_items"><!--features_items-->
						            <h2 class="title text-center">Features Items</h2>
                                    ${result}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
        } catch (error) {
            console.log(error);
        }
    }
}
export default ProductsPage;