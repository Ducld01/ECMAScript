import ProductApi from "../api/productAPI";
import { parseRequestUrl } from "../utils";
import CategoryAPI from '../api/categoryAPI';

const CategoryPage = {
    async render(){
        //const { id } = parseRequestUrl();
        const { id } = parseRequestUrl();
        console.log(id);
        const { data : categories } = await CategoryAPI.getAll();
        const { data: products } = await ProductApi.getAll();
        console.log(products);
    //     const result = products.filter(products.categoryId == id)
    //                             .map(product => {
    //                             return `<div><a href="/#/products/${product.id}">${product.name}</a></div>`
    //                             }).join("");
    // return `${result}`
    const result = products.filter(product => product.categoryId == id).map(product => {
            return /*html*/`
                    <div class="row">
                        <div class="col-sm-3" style="width: 25rem;">
                            <img src="http://localhost:5000/api/product/photo/${product._id}" class="card-img-top" alt="${product.name}" width=200px>
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text"></p>
                                <a href="/#/products/${product._id}" class="btn btn-primary">Detail</a>
                            </div>
                        </div>
                    </div>
                `
                // <img src="${product.image}" class="card-img-top" alt="${product.name}">
                // <div><a href="/#/products/${product.id}"/>${product.name}</div>
                // <div><a href="/#/products/${product.id}"/>${product.price}</div>
    }).join("");
    return `<div class="container py-5">
    <div class="row">
    <div class="col-lg-3">
    <h1 class="h2 pb-4">Categories</h1>
    <ul class="list-unstyled templatemo-accordion">
        <li class="pb-3">
            <a class="collapsed d-flex justify-content-between h3 text-decoration-none" href="#">
                ${
                    categories.map(category => {
                        return `<li><a class="dropdown-item" href="/#/category/${category.id}">${category.name}</a></li>`
                    }).join("")
                }
            </a>
        </li>

    </ul>
</div>

        <div class="col-lg-9">
            <div class="row">
                <div class="col-md-6">
                    <ul class="list-inline shop-top-menu pb-3 pt-1">
                        <li class="list-inline-item">
                            <a class="h3 text-dark text-decoration-none mr-3" href="#">All</a>
                        </li>
                        <li class="list-inline-item">
                            <a class="h3 text-dark text-decoration-none mr-3" href="#">Men's</a>
                        </li>
                        <li class="list-inline-item">
                            <a class="h3 text-dark text-decoration-none" href="#">Women's</a>
                        </li>
                    </ul>
                </div>

            </div>
            ${result}
        </div>
        </div>
        </div>
        </div>`
    }
}
export default CategoryPage;