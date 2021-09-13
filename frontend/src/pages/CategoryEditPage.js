import CategoryAPI from '../api/categoryAPI.js';

import { parseRequestUrl, $, } from '../utils.js';

const CategoryEditPage = {
    async render(){
        const { id } = parseRequestUrl();
        const { data: category } = await CategoryAPI.get(id);
        return /*html */`
        <form id="form-update-cate">

            <div class="mb-3">
                <label for="cate-name" class="form-label">Category Name</label>
                <input type="text" class="form-control" value="${category.name}" id="cate-name"  >
            </div>   
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        `
    },
    async afterRender() {
        const { id } = parseRequestUrl();
        const { data: category } = await CategoryAPI.get(id);
        $('#form-update-cate').addEventListener('submit', async(e) => {
            e.preventDefault();
            const newCategory = {
                ...category,
                name: $('#cate-name').value
            };
            await CategoryAPI.update(id, newCategory);
            alert("successfully updated");
            window.location.hash = '/listcategory'
            window.location.reload(CategoryEditPage);
        })
    }
}
export default CategoryEditPage;