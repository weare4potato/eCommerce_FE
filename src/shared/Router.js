import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import MemberSignInPage from '../pages/member/MemberSignInPage';
import MemberSignUpPage from "../pages/member/MemberSignUpPage";
import StoreSignInPage from "../pages/store/StoreSignInPage";
import StoreSignUpPage from "../pages/store/StoreSignUpPage";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Main from "../pages/Main";
import ProductsByCategoryPage from "../pages/ProductsByCategoryPage";
import ProductsByShopsPage from "../pages/ProductsByShopsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import OrderListPage from "../pages/order/OrderListPage";
import OrderCompletePage from "../pages/order/OrderCompletePage";
import ReceiverMainPage from "../pages/receiver/ReceiverMainPage";
import ReceiverCreatePage from "../pages/receiver/ReceiverCreatePage";
import ReceiverUpdatePage from "../pages/receiver/ReceiverUpdatePage";
import CreateProductPage from "../pages/CreateProductPage";
import ShopsByProducts from "../components/ProductList/ShopsByProducts";
import OrderPage from "../pages/order/OrderPage"
import CheckoutPage from "../pages/toss/CheckoutPage"
import {SuccessPage} from "../pages/toss/SuccessPage";
import {FailPage} from "../pages/toss/FailPage";
import CartPage from "../pages/cart/CartPage";
import UpdateProductPage from "../pages/UpdateProductPage";
import ShopsByProductsPage from "../pages/ShopsByProductsPage";
import ImageTest from "../imageTest/ImageTest";
const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/category/:categoryId" element={<ProductsByCategoryPage />} />
                <Route path="/shops/:shopId" element={<ProductsByShopsPage />} />
                <Route path="/products/:productId" element={<ProductDetailsPage />} />
                <Route path="/login" element={<MemberSignInPage/>}/>
                <Route path="/signup" element={<MemberSignUpPage/>}/>
                <Route path="/shops/login" element={<StoreSignInPage/>}/>
                <Route path="/shops/signup" element={<StoreSignUpPage/>}/>
                <Route path="/receiver" element={<ReceiverMainPage/>}/>
                <Route path="/receiver/:receiverId" element={<ReceiverUpdatePage/>}/>
                <Route path="/createReceiver" element={<ReceiverCreatePage/>}/>
                <Route path="/orders/list" element={<OrderListPage/>}/>
                <Route path="/orderComplete" element={<OrderCompletePage/>}/>
                <Route path="/createproduct" element={<CreateProductPage/>}/>
                <Route path="/shops/products" element={<ShopsByProductsPage/>}/>
                <Route path="/orders" element={<OrderPage />} />
                <Route path="/orders/:orderId/payment/toss" element={<CheckoutPage />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/fail" element={<FailPage />} />
                <Route path="/carts" element={<CartPage/>}/>
                <Route path="/updateProduct/:productId" element={<UpdateProductPage/>}/>
                <Route path="/test" element={<ImageTest/>}/>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Router;