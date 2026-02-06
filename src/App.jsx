import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Home_Page from "./pages/Home_Page";
import Best_Seller from "./pages/Best_Seller";
import Categories from "./pages/Categories";
import Product_Page from "./pages/Product_Page";
import Thank_You from "./pages/carts/Thank_You";
import Contact from "./pages/Contact";
import Account_Page from "./pages/accounts/Account_Page";
import Checkout from "./pages/carts/Checkout";
import Your_Carts from "./pages/carts/Your_Carts";
import Wishlists from "./pages/carts/Wishlists";
import TermsCondition from "./pages/help/TermsCondition";
import PrivacyPolicy from "./pages/help/PrivacyPolicy";
import ShippingPolicy from "./pages/help/ShippingPolicy";
import RefundPolicy from "./pages/help/RefundPolicy";
import Login from "./pages/accounts/Login";
import Forget_Password from "./pages/accounts/Forget_Password";
import Create_Account from "./pages/accounts/Create_Account";

// import ProdductSpice from "./pages/Product_spice";
import Product_spice from "./pages/Product_spice";
import ScrollToTop from "./components/ScrollToTop";
import SpicePowders from "./pages/SpicePowders/SpicePowders";
import Cosmetics from "./pages/Cosmetics/Oyl-Bath";

import Snacks from "./pages/Snacks/Snacks";
import IceCream from "./pages/IceCream/Mango";
import Fruits from "./pages/Fruits/Fruits";
import Vegetables from "./pages/Vegetables/Vegetables";

import DryFruits from "./pages/dry-fruits/DryFruits";
import MilletCategory from "./pages/MilletCategory";
import BarnyardMillet from "./pages/Millets/BarnyardMillet";
import FoxtailMillet from "./pages/Millets/FoxtailMillet";
import AlphonsoMango from "./pages/IceCream/Mango";
import Vanilla from "./pages/IceCream/Vanilla";
import ClayCategory from "./pages/ClayCategories";
import ClayBowl from "./pages/Clay-Utensils/Clay-Bowl";
import ClayKadai from "./pages/Clay-Utensils/Clay-Kadai";
import GiftingOne from "./pages/GiftingSolutions/Gifting-one";
import GiftingTwo from "./pages/GiftingSolutions/Gifting-two";
import OylBath from "./pages/Cosmetics/Oyl-Bath";
import HandWash from "./pages/Cosmetics/Hand-Wash";
import BackToTop from "./components/BackToTop";
import FragranceOil from "./pages/home-essentials/fragrance-oil";
import LuxuryFragrance from "./pages/home-essentials/luxury-fragrance";
import ChandanSticks from "./pages/home-essentials/Chandan-Sticks";
import KasturiSticks from "./pages/home-essentials/Kasturi-Sticks";
import SearchBarToggle from "./components/SearchbarToggle";
import ProductDetails from "./pages/oil-products/ProductDetails";
import Address_Details from "./pages/accounts/Address_Details";
import Order_Details from "./pages/accounts/Order_Details";
import CategoryPage from "./pages/oil-products/CategoryPage";
import PrivateRoute from "./components/PrivateRoute";
import ProfileDetails from "./pages/accounts/Profile-details";
import SearchResults from "./components/SearchResults";
import ResetPassword from "./pages/accounts/ResetPassword";
import PaymentFailed from "./pages/carts/FailurePage";
import WhatsAppButton from "./components/WhatsAppBtn";
import Home from "./pages/Home";




function App() {
  return (
    <>
      <Router>
        <BackToTop/>
        <WhatsAppButton/>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home_Page />} />
          <Route path="/best-seller" element={<Best_Seller />} />
          <Route path="/shop" element={<Categories />} />
          <Route path="/product-page/:id" element={<Product_Page/>} />
          <Route path="/thankyou" element={<Thank_You />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account_Page />} />
          <Route path="/address-details" element={<Address_Details/>}/>
          <Route path="/order-details" element={<Order_Details/>}/>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/carts" element={<Your_Carts />} />
          <Route path="/wishlist" element={<Wishlists />} />
          <Route path="/MilletCategories" element={<MilletCategory/>}/>
          <Route path="/terms-conditions" element={<TermsCondition />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget_password" element={<Forget_Password />} />
          <Route path="/create_account" element={<Create_Account />} />
          <Route path="/spice-powders" element={<SpicePowders/>}/>
          <Route path="/cosmetics" element={<Cosmetics/>}/>

          <Route path="/snacks" element={<Snacks/>}/>
          <Route path="/ice-cream" element={<IceCream/>}/>
          <Route path="/fruits" element={<Fruits/>}/>
          <Route path="/vegetables" element={<Vegetables/>}/>
          
           <Route path="/dry-fruits" element={<DryFruits/>}/>
          <Route path="/product-spice/:id" element={<Product_spice />} />
          
       {/*<Route path="/oilcategory" element={<OilCategory/>}/>*/}
        <Route path="/oil-products/:productName" element={<ProductDetails />} />
      <Route path="/shop/:categoryName" element={<CategoryPage />} />
      <Route path="/reset-password/:token" element={<ResetPassword/>}/>
      <Route path="/payment-failed" element={<PaymentFailed/>}/>
 
     

<Route
  path="/checkout"
  element={
    <PrivateRoute>
      <Checkout />
    </PrivateRoute>
  }
/>

<Route path="/profile-details" element={<ProfileDetails/>}/>

      



<Route path="/shop" element={<Categories/>}/>
          <Route path="/Millets/BarnyardMillet" element={<BarnyardMillet/>}/>
          <Route path="/Millets/FoxtailMillet" element={<FoxtailMillet/>}/>
          <Route path="/IceCream/alphonso-mango" element={<AlphonsoMango/>}/>
           <Route path="/IceCream/vanilla" element={<Vanilla/>}/>
          {/*<Route path="/IceCreamCategories" element={<IcecreamCategory/>}/>*/}
          <Route path="/Clay-Utensils" element={<ClayCategory/>}/>
          <Route path="/Clay-Utensils/clay-bowl" element={<ClayBowl/>}/>
          <Route path="/Clay-Utensils/clay-kadai" element={<ClayKadai/>}/>
         {/*} <Route path="/Gifting-Solutions" element={<GiftingCategory/>}/>*/}
          <Route path="/Gifting-Solutions/Gifting-one" element={<GiftingOne/>}/>
          <Route path="/Gifting-Solutions/Gifting-two" element={<GiftingTwo/>}/>
          {/*<Route path="/CosmeticsCategory" element={<CosmeticCategory/>}/>*/}
          <Route path="CosmeticsCategory/oyl-bath" element={<OylBath/>}/>
          <Route path="CosmeticsCategory/hand-wash" element={<HandWash/>}/>
          {/*<Route path="/home-essentials" element={<HomeEssentailsCategory/>}/>*/}
          <Route path="/home-essentials/fragrance-oil" element={<FragranceOil/>}/>
          <Route path="/home-essentials/luxury-fragrance-oil" element={<LuxuryFragrance/>}/>
          <Route path="/home-essentials/nature-chandan-incense" element={<ChandanSticks/>}/>
          <Route path="/home-essentials/nature-kasturi-incense" element={<KasturiSticks/>}/>
          <Route path="/search-bar" element={<SearchBarToggle/>}/>
         
<Route path="/search" element={<SearchResults />} />

        </Routes>
        
      </Router>
    </>
  );
}

export default App;
