import CategoryAPI from '../api/categoryAPI.js';

import { $ } from '../utils.js';

const CategoryAddPage = {
    async render() {
        return /*html */`
        <form id="form-add-cate">

        <div class="form-group mb-3">
            <label for="cate-name" class="form-label">Categori Name</label>
            <input type="text" id="cate-name" class="form-control" >
            <span id="infe"></span>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        `
    },
    async afterRender(){
        const {data: cates} = await CategoryAPI.getAll();

        $("#form-add-cate").addEventListener('submit', e => {
            e.preventDefault();
            let mess=[];
            let rgname = /^[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐa-zA-Z 0-9]*$/;
            if($("#cate-name").value == '' || $("#cate-name").value == null){
                $("#infe").innerText ="Product name is require";
                $("#cate-name").classList.toggle("border-red-500");
                mess=mess+1;
            }
            else if(rgname.test($("#cate-name").value) == false){
                $("#infe").innerText ="Product name is not in the correct format";
                $("#cate-name").classList.toggle("border-red-500");
                mess=mess+1;
            }
            const cate = {
                name: $("#cate-name").value
            }
            
            
        const {datas } =  CategoryAPI.add(cate);
        console.log(datas);
            window.location.hash = '/listcategory';
        })
    }
}
export default CategoryAddPage;