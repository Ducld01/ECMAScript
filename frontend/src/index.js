import Error404Page from './pages/Error404Page.js';
import Home from './pages/Home.js';
import ProductDetailPage from './pages/ProductDetailPage.js';
import ProductsPage from './pages/ProductsPage';
import { parseRequestUrl, $ } from './utils.js';
import Header from './components/Header.js';
import CategoryPage from './pages/CategoryPage.js';
import ProductAddPage from './pages/ProductAddPage.js';
import AdminProductPage from './pages/AdminProductPage.js';
import NewPage from './pages/NewPage.js';
import ContactPage from './pages/ContactPage.js';
import ProductEditPage from './pages/ProductEditPage.js';
import CategoryEditPage from './pages/CategoryEditPage.js';
import AdminCategoryPage from './pages/AdminCategoryPage.js';
import CategoryAddPage from './pages/CategoryAddPage.js';


const routes = {
    '/': Home,
    '/products': ProductsPage,
    '/products/:id': ProductDetailPage,
    '/category/:id': CategoryPage,
    '/addproduct': ProductAddPage,
    '/addcategory': CategoryAddPage,
    '/listproduct': AdminProductPage,
    '/listcategory': AdminCategoryPage,
    '/new': NewPage,
    '/editproduct/:id': ProductEditPage,
    '/editcategory/:id': CategoryEditPage,
    '/contact': ContactPage
}


const router = async () => {
    const { resource, id } = parseRequestUrl();
    const parseUrl = (resource ? `/${resource}` : '/') +
        (id ? `/:id` : '')
    console.log(parseUrl);
    const page = routes[parseUrl] ? routes[parseUrl] : Error404Page;
    $('#header').innerHTML = await Header.render();
    $('#main-content').innerHTML = await page.render();
    if (page.afterRender) { await page.afterRender() };
    await page.afterRender();
    let product = JSON.parse(localStorage.getItem('cart'));
    let lengthcart = 0;
    product.forEach(element => {
        lengthcart += element.quantity;
    });
    $("#quantity-cart").innerHTML = lengthcart;

}

window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);
