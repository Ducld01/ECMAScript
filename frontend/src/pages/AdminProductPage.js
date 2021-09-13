import ListProduct from "../components/ListProduct.js";
import SidebarMenu from "../components/SidebarMenu.js";

const AdminProductPage = {
    async render(){
        return /*html*/`
            <div class="row">
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                ${SidebarMenu.render()}
            </nav>
            <!--  -->
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Product</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group me-2">
                        <a href="#/addproduct">
                            <button type="button" class="btn btn-sm btn-outline-secondary">New Product</button>
                        </a>
                    </div>
        </div>
      </div>
            <!--  -->
      <div class="table-responsive" id="list-products">
        ${await ListProduct.render()}
      </div>
    </main>
  </div>
</div>`
    },
    async afterRender(){
        return `${await ListProduct.afterRender()}`
    }
};
export default AdminProductPage;