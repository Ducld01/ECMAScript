import ProductAPI from "../api/productAPI";
import { reRender, $} from '../utils.js';

const ListProduct = {
    async render(){
        const { data : product } = await ProductAPI.getAll();


        return /*html*/`<table class="table table-striped table-sm" id="table-listproduct">
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Description</th>
            <th colspan="1"></th>
          </tr>
        </thead>
        <tbody>
        ${product
          .map((product, index) => {
            return /*html*/ `<tr>
            <td>${index+1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><img src="http://localhost:5000/api/product/photo/${product._id}" width="50px" height="50px" /></td>
            <td>${product.status ? "Còn hàng" : "Hết Hàng"}</td>
            <td>${product.quantity}</td>
            <td>${product.description}</td>
            <td colspan="1">
            <a href="/#/editproduct/${product._id}" class="btn btn-outline-primary">Update</a>
            <button class="btn btn-outline-danger btn-remove" data-id="${product._id}" id="btn-remove">Remove</button>
            </td>
          </tr>`;
          })
          .join("")}
        </tbody>
      </table>
      `;
    },
    async afterRender() {
      const btns = $("#btn-remove");
      // console.log(btns);
  
      btns.forEach((btn) => {
        let id = btn.dataset.id;
        btn.addEventListener("click", async function () {
          if (btn.classList.contains("btn-remove")) {
              const question = confirm("Are you sure?");
              if (question) {
                await ProductAPI.remove(id);
                await reRender(ListProduct, "#list-product");
              }
          }
        });
      });
    },
  };
  export default ListProduct;