import Company from "./components/administrator1/Company"
import DisplayAllCompanies from "./components/administrator1/DisplayAllCompanies";

import { BrowserRouter as Router, Routes ,Route } from "react-router-dom";

import AdminLogin from "./components/administrator2/AdminLogin";
import DashBoard from "./components/administrator2/DashBoard";
import Header from "./components/userinterface/usercomponents/homepage/Header";
import Home from "./components/userinterface/screens/Home";
import HomePageDrawer from "./components/userinterface/usercomponents/homepage/HomePageDrawer";
import AllCategory from "./components/userinterface/screens/AllCategory";
import Products from "./components/userinterface/screens/Products";
// import Banner from "./components/administrator2/Banner";
// import DisplayAllBanners from "./components/administrator2/DisplayAllBanners";
import Cart from "./components/userinterface/screens/Cart";


function App() {
  return (
    <div >
     {/* <Company />   */}
     {/* <DisplayAllCompanies/> */}
     <Router>
      <Routes>
      <Route element={<Company />} path="/" />
        <Route element={<Company/>} path="/company" />  
        <Route element={<DisplayAllCompanies/>} path="/displayallcompanies" />
        <Route element={<AdminLogin/>} path="/adminlogin" />
        <Route element={<DashBoard />} path="/dashboard/*" />
        <Route element={<Home/>} path="/home" />
        <Route element={<Header/>} path="/header" />
        <Route element={<HomePageDrawer/>} path="/homepagedrawer" />
        <Route element={<AllCategory/>} path="/allcategory" />
        <Route element={<Products/>} path="/exploreproducts" />
        <Route element={<Cart/>} path="/cart" />

      </Routes>
     </Router>
    </div>
  );
}

export default App;
