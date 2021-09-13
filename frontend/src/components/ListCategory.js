import CategoryAPI from "../api/categoryAPI.js";
import { reRender, $ } from '../utils.js';

const ListCategory = {
    async render() {
        const { data: categories } = await CategoryAPI.getAll();

        return /*html*/`
<table class="table table-striped table-sm">
<thead>
  <tr>
    <th>ID</th>
    <th>Name</th>
    
    <th width="200">Action</th>

  </tr>
</thead>
<tbody>
  ${categories.map((category,) => {
            return /*html*/`
          <tr>
              <td>${category._id}</td>
              <td>${category.name}</td>
              <td>
                  <a href="/#/editcategory/${category._id}" class="rounded-sm w-30  btn-primary " id="update-button">Update
                  </a>
                  <button type="button" class="btn btn-danger btn-remove" data-id="${category._id}">Remove</button>
              </td>
              
        </tr>
      `
        }).join("")
            }
  
</tbody>
</table>  
`
    },

  async afterRender() {
    const btns = $("#list-categories .btn");
    // console.log(btns);
  
    btns.forEach((btn) => {
      let id = btn.dataset.id;
      btn.addEventListener("click", async function () {
        if (btn.classList.contains("btn-remove")) {
            const question = confirm("Are you sure?");
            if (question) {
              await CategoryAPI.remove(id);
              await reRender(ListCategory, "#list-categories");
            }
        }
      });
    });
  },
  };
  export default ListCategory;