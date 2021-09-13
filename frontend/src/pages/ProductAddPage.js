import ProductApi from '../api/productAPI';
import { $, reRender } from "../utils";
// import firebase from "../firebase";
import ListProduct from "../components/ListProduct";
import CategoryAPI from '../api/categoryAPI'


const ProductAddPage = {
 async render() {
    const { data: categories } = await CategoryAPI.getAll();  
    return /*html*/ `
            <form id="form-add">
            <div class="mb-3">
                <label for="product-name" class="form-label">Tên sản phẩm</label>
                <input type="text" placeholder="Tên sản phẩm" id="product-name" class="form-control"/>
            </div>
            <div class="mb-3">
            <label for="product-name" class="form-label">Ảnh</label>
                <input type="file" id="product-image" class="form-control"/>
            </div>
            <div class="mb-3">
            <label for="product-name" class="form-label">Giá</label>
                <input type="number" placeholder="Giá sản phẩm" id="product-price" class="form-control"/>
            </div>
            
            <div class="mb-3">
            <label for="product-name" class="form-label">Số lượng</label>
                <input type="text" placeholder="Số lượng" id="product-quantity" class="form-control"/>
            </div>
            <div class="mb-3">
            <label for="product-name" class="form-label">Danh mục:</label>
            <select class="mb-3" id="category-id" aria-label="Default select example">
              ${categories.map(category => {
                return `<option value="${category._id}">${category.name}</option>
                `
            }).join("")}
            </select>
            </div>
            <div class="mb-3">
            <label for="product-name" class="form-label">Miêu tả</label>
                <input type="text" placeholder="Miêu tả" id="product-description" class="form-control"/>
            </div>
            <div class="form-group">
            <input type="submit" class="btn btn-primary" value="ADD PRODUCT">
            </div>    
            </form>
        `;
  },
  afterRender() {
    $("#form-add").addEventListener("submit", (e) => {
      e.preventDefault();
     const productImage = $('#product-image').files[0];
     const formData = new FormData();
     formData.append('name', $('#product-name').value)
     formData.append('photo',productImage )
     formData.append('price', $('#product-price').value)
    //  formData.append('shipping', $('#product-status').value)
     formData.append('quantity', $('#product-quantity').value)
     formData.append('category', $('#category-id').value)
     formData.append('description', $('#product-description').value)
     const {data} = ProductApi.add(formData);
     console.log(data);
     window.location.hash = '/listproduct';
     alert("Them san pham thanh cong")
    });
  },
};
export default ProductAddPage;