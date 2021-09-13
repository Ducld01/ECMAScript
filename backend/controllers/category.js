import Category from '../models/categories';

export const create = (req, res) => {
    const category = new Category(req.body);
    // console.log(category);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Không thêm được danh mục"
            })
        }
        res.json( data )
    })
}
export const list = (req, res) => {
    // console.log()
    Category.find((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Danh mục không tồn tại"
            })
        }
        res.json( data )
    })
}
export const categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            res.status(400).json({
                error: 'Category not found'
            })
        }
        req.category = category;
        // console.log(req.category);
        next();
    })
}
export const read = (req, res) => {
    // console.log(req);
    return res.json(req.category);
}
export const update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    // console.log(category)
    category.save((err, data) => {
        if (err || !category) {
            res.status(400).json({
                error: "Danh mục này không tồn tại"
            })
        }
        res.json( data );
    })
}
export const remove = (req, res) => {
    let category = req.category;
    category.remove((err, deleteCategory) => {
        if (err || !category) {
            res.status(400).json({
                error: "Danh mục này không tồn tại"
            })
        }
        res.json({
            deleteCategory,
            message: "Xóa danh mục thành công"
        });
    })
}