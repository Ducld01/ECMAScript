import ProductApi from '../api/productAPI.js';
import CategoryAPI from '../api/categoryAPI.js';
import firebase from '../firebase/index.js';
import { parseRequestUrl, $ } from '../utils.js';

const ProductEditPage = {
    async render() {
        const { id } = parseRequestUrl();
        const { data: product} = await ProductApi.get(id);
        
        return /*html*/`
        <form id="form-update-product">
            <div class="mb-3">
                <label for="product-name" class="form-label">Product Name</label>
                <input type="text" class="form-control" value="${product.name}" id="product-name"  >
            </div>
            <div class="mb-3">
                <label for="product-image" class="form-label">Product Image</label>
                <input type="file" class="form-control" value="http://localhost:5000/api/product/photo/${product._id}" id="product-image"  >
            </div>
            
            <div class="mb-3">
                <label for="product-price" class="form-label">Product Price</label>
                <input type="number" class="form-control" value="${product.price}" id="product-price" >
            </div>
            <div class="">
                <label for="product-price" class="form-label">Product Detail</label>
                <input type="text" class="form-control" value="${product.detail}" id="product-detail" >
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
      </form>
        `
    },
    async afterRender() {
        const { id } = parseRequestUrl();
        const { data: product} = await ProductApi.get(id);
        $('#form-update-product').addEventListener('submit', (e)=>{
            e.preventDefault();
            console.log(product)
            const productImage = $('#product-image').files[0];
             let storageRef = firebase.storage().ref(`images/${productImage.name}`);
                storageRef.put(productImage).then(function () {
                    console.log("upload thành công ");
                    storageRef.getDownloadURL().then((url) => {
                        const newProduct = {
                            ...product,
                            name: $('#product-name').value,
                            image: url,
                            price : $('#product-price').value,
                            detail : $('#product-detail').value
                        
                        };
                        console.log(newProduct);
                        ProductApi.update(id, newProduct);
                        window.location.hash = '/listproduct'
                    });
            });
        })
     }
};
export default ProductEditPage;