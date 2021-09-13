const SidebarMenu = {
     render(){
        return /*html*/`
            <div class="position-sticky pt-3">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link" href="/#/products">
                            <span data-feather="shopping-cart"></span>
                            Products
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/#/listcategory">
                            <span data-feather="shopping-cart"></span>
                            Categories
                            </a>
                        </li>
            `
    }
}
export default SidebarMenu;