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
import Navbar_Menu from "./components/Navbar_Menu";
import Footer from "./components/Footer";
import Login from "./pages/accounts/Login";
import Forget_Password from "./pages/accounts/Forget_Password";
import Create_Account from "./pages/accounts/Create_Account";

// import ProdductSpice from "./pages/Product_spice";
import Product_spice from "./pages/Product_spice";
import AlmondOil from "./pages/oil-products/AlmondOil";
import OilCategory from "./pages/oil-products/oilcategory";
import BlackSesameOil from "./pages/oil-products/BlackSesameOil";
import CastorOil from "./pages/oil-products/CastorOil";
import CoconutOil from "./pages/oil-products/CoconutOil";
import GroundnutOil from "./pages/oil-products/GroundnutOil";
import HairOil from "./pages/oil-products/HairOil";
import HongeOil from "./pages/oil-products/HongeOil";
import MustardOil from "./pages/oil-products/MustardOil";
import NeemOil from "./pages/oil-products/NeemOil";
import SunflowerOil from "./pages/oil-products/SunflowerOil";
import WhiteSesameOil from "./pages/oil-products/WhiteSesameOil";
import Yelludeepam from "./pages/oil-products/Yelludeepamoil";
import DeepamOil from "./pages/oil-products/DeepamOil";
import SafflowerOil from "./pages/oil-products/SafflowerOil";
import ScrollToTop from "./components/ScrollToTop";
import SpicePowders from "./pages/SpicePowders/SpicePowders";
import Cosmetics from "./pages/Cosmetics/Oyl-Bath";
import ClayUtensils from "./pages/Clay-Utensils/Clay-Bowl";
import Snacks from "./pages/Snacks/Snacks";
import IceCream from "./pages/IceCream/Mango";
import Fruits from "./pages/Fruits/Fruits";
import Vegetables from "./pages/Vegetables/Vegetables";
import GiftingSolutions from "./pages/GiftingSolutions/Gifting-one";
import DryFruits from "./pages/dry-fruits/DryFruits";
import MilletCategory from "./pages/MilletCategory";
import BarnyardMillet from "./pages/Millets/BarnyardMillet";
import FoxtailMillet from "./pages/Millets/FoxtailMillet";
import AlphonsoMango from "./pages/IceCream/Mango";
import IcecreamCategory from "./pages/IceCreamCategories";
import Vanilla from "./pages/IceCream/Vanilla";
import ClayCategory from "./pages/ClayCategories";
import ClayBowl from "./pages/Clay-Utensils/Clay-Bowl";
import ClayKadai from "./pages/Clay-Utensils/Clay-Kadai";
import GiftingCategory from "./pages/GiftingCategory";
import GiftingOne from "./pages/GiftingSolutions/Gifting-one";
import GiftingTwo from "./pages/GiftingSolutions/Gifting-two";
import CosmeticCategory from "./pages/CosmeticsCategory";
import OylBath from "./pages/Cosmetics/Oyl-Bath";
import HandWash from "./pages/Cosmetics/Hand-Wash";
import BackToTop from "./components/BackToTop";
import HomeEssentailsCategory from "./pages/HomeEssentialCategory";
import FragranceOil from "./pages/home-essentials/fragrance-oil";
import LuxuryFragrance from "./pages/home-essentials/luxury-fragrance";
import ChandanSticks from "./pages/home-essentials/Chandan-Sticks";
import KasturiSticks from "./pages/home-essentials/Kasturi-Sticks";
import SearchBarToggle from "./components/SearchbarToggle";



function App() {
  return (
    <>
      <Router>
        <BackToTop/>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home_Page />} />
          <Route path="/best-seller" element={<Best_Seller />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/product-page/:id" element={<Product_Page/>} />
          <Route path="/thankyou" element={<Thank_You />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account_Page />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/carts" element={<Your_Carts />} />
          <Route path="/wishlist" element={<Wishlists />} />
          <Route path="/MilletCategories" element={<MilletCategory/>}/>
          {/* <Route path="/terms-conditions" element={<TermsCondition />} /> */}
          {/* <Route path="/privacy" element={<PrivacyPolicy />} /> */}
          {/* <Route path="/shipping-policy" element={<ShippingPolicy />} /> */}
          {/* <Route path="/refund-policy" element={<RefundPolicy />} /> */}
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
          <Route path="/oil-products/AlmondOil" element={<AlmondOil/>}/>
          <Route path="/oil-products/OilCategory" element={<OilCategory/>}/>
          <Route path="/oil-products/BlackSesameOil" element={<BlackSesameOil/>}/>
          <Route path="/oil-products/CastorOil" element={<CastorOil/>}/>
          <Route path="/oil-products/CoconutOil" element={<CoconutOil/>}/>
          <Route path="/oil-products/GroundnutOil" element={<GroundnutOil/>}/>
          <Route path="/oil-products/HairOil" element={<HairOil/>}/>
          <Route path="/oil-products/HongeOil" element={<HongeOil/>}/>
          <Route path="/oil-products/MustardOil" element={<MustardOil/>}/>
          <Route path="/oil-products/NeemOil" element={<NeemOil/>}/>
          <Route path="/oil-products/SunflowerOil" element={<SunflowerOil/>}/>
          <Route path="/oil-products/WhiteSesameOil" element={<WhiteSesameOil/>}/>
          <Route path="/oil-products/Yelludeepamoil" element={<Yelludeepam/>}/>
          <Route path="/oil-products/DeepamOil" element={<DeepamOil/>}/>
          <Route path="/oil-products/Sunflower" element={<SafflowerOil/>}/>
          <Route path="/Millets/BarnyardMillet" element={<BarnyardMillet/>}/>
          <Route path="/Millets/FoxtailMillet" element={<FoxtailMillet/>}/>
          <Route path="/IceCream/alphonso-mango" element={<AlphonsoMango/>}/>
           <Route path="/IceCream/vanilla" element={<Vanilla/>}/>
          <Route path="/IceCreamCategories" element={<IcecreamCategory/>}/>
          <Route path="/Clay-Utensils" element={<ClayCategory/>}/>
          <Route path="/Clay-Utensils/clay-bowl" element={<ClayBowl/>}/>
          <Route path="/Clay-Utensils/clay-kadai" element={<ClayKadai/>}/>
          <Route path="/Gifting-Solutions" element={<GiftingCategory/>}/>
          <Route path="/Gifting-Solutions/Gifting-one" element={<GiftingOne/>}/>
          <Route path="/Gifting-Solutions/Gifting-two" element={<GiftingTwo/>}/>
          <Route path="/CosmeticsCategory" element={<CosmeticCategory/>}/>
          <Route path="CosmeticsCategory/oyl-bath" element={<OylBath/>}/>
          <Route path="CosmeticsCategory/hand-wash" element={<HandWash/>}/>
          <Route path="/home-essentials" element={<HomeEssentailsCategory/>}/>
          <Route path="/home-essentials/fragrance-oil" element={<FragranceOil/>}/>
          <Route path="/home-essentials/luxury-fragrance-oil" element={<LuxuryFragrance/>}/>
          <Route path="/home-essentials/nature-chandan-incense" element={<ChandanSticks/>}/>
          <Route path="/home-essentials/nature-kasturi-incense" element={<KasturiSticks/>}/>
          <Route path="/search-bar" element={<SearchBarToggle/>}/>
        </Routes>
        
      </Router>
    </>
  );
}

export default App;
