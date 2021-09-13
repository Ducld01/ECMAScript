import CategoryAPI from "../api/categoryAPI";

const Header = {
    async render() {
        // const { data: categories } = await CategoryAPI.getAll();
        const { data: categories } = await CategoryAPI.getAll();
        // console.log(categories.data);
        return /*html*/`
        <!--header-->
		<div class="header_top">
			<!--header_top-->
			
		</div>
		</div>
		<!--/header_top-->

		<div class="header-middle">
			<!--header-middle-->
			<div class="container">
				<div class="row">
					<div class="col-sm-4">
						<div class="logo pull-left">
							<a href="#"><img src="./src/image/home/logo.png" alt="" /></a>
						</div>
					</div>
					<div class="col-sm-8">
						<div class="shop-menu pull-right">
							<ul class="nav navbar-nav">
								<li><a href="#"><i class="fa fa-user"></i> Account</a></li>
								<li><a href="/#/listproduct"><i class="fas fa-user-alt"></i> Admin</a></li>
								<li><a href=""><i class="fa fa-shopping-cart"></i> Cart <span>0</span></a></li>
								<li><a href=""><i class="fa fa-lock"></i> Login</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--/header-middle-->

		<div class="header-bottom">
			<!--header-bottom-->
			<div class="container">
				<div class="row">
					<div class="col-sm-9">
						<div class="navbar-header">
							<button type="button" class="navbar-toggle" data-toggle="collapse"
								data-target=".navbar-collapse">
								<span class="sr-only">Toggle navigation</span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							</button>
						</div>
						<div class="mainmenu pull-left">
							<ul class="nav navbar-nav collapse navbar-collapse">
								<li><a href="index.html" class="active">Home</a></li>
								<li class="dropdown"><a href="#">Shop<i class="fa fa-angle-down"></i></a>
									<ul role="menu" class="sub-menu">
										<li><a href="#/products">Products</a></li>
										<li><a href="">Cart</a></li>
										<li><a href="">Login</a></li>
									</ul>
								</li>
								<li class="dropdown"><a href="">Admin<i class="fa fa-angle-down"></i></a>
											<ul role="menu" class="sub-menu">
												<li><a href="/#/listproduct">Product</a></li>
												<li><a href="/#/listcategory">Category</a></li>
											</ul>
										</li>
								<li class="dropdown"><a href="/#/contact">Blog<i class="fa fa-angle-down"></i></a>
									<ul role="menu" class="sub-menu">
										<li><a href="">Blog List</a></li>
										<li><a href="/#/contact">Blog Single</a></li>
									</ul>
								</li>
								<!-- <li><a href="404.html">404</a></li> -->
								<li><a href="contact-us.html">Contact</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-3">
						<div class="search_box pull-right">
							<input type="text" placeholder="Search" ">
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--/header-bottom-->
        `
    }
}
export default Header;