
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Homepage from './Pages/Home/Homepage';
import Login from './Components/Login';
import Register from './Components/Register';
import Wishlist from './Components/User/Wishlist';
import Cart from './Components/User/Cart';
import Singleproduct from './Components/User/Singleproduct';
import Samplehome from './Components/User/Samplehome';
import Viewproductdetails from './Components/User/Viewproductdetails';
import Otpform from './Components/Otpform';
import Forgotpass from './Components/User/Forgotpass';
import Forgotpassotpcomp from './Components/User/Forgotpassotpcomp';
import Updatepass from './Components/Updatepass';
import Userhome from './Components/User/Userhome';
import Admin from './Pages/Admin/Admin';
import MyComponent from './Pages/Admin/Sample';
import Productform from './Pages/Admin/Productform';
import Checkout from './Components/User/Checkout';
import Profile from './Components/profilesection/Profile';
import Productsection from './Components/User/Productsection';
import Sidebar from './Components/User/Usersidebar';
import Myorders from './Components/profilesection/Myorders';
import Payment from './Components/User/Payment';
import OrderSuccess from './Components/User/Ordersuccess';
import Trackorder from './Components/profilesection/Trackorder';
import Ordersummary from './Pages/Admin/Ordersummary';
import Adminallorders from './Components/Admin/Adminallorders';
import Adminallorderspage from './Pages/Admin/Adminallorderspage';
import Rewards from './Components/profilesection/Rewards';
import Wallet from './Components/profilesection/wallet';
import ProfileAddresses from './Components/profilesection/ProfileAddresses';
import Profilefavourites from './Components/profilesection/Profilefavourites';
import Checkoutnew from './Components/User/Productsectioncontent';
import Adminusersviewpage from './Pages/Admin/Adminusersviewpage';

function App() {

  // text-[#8B8E99]
  return (

    <>

      <ToastContainer limit={1} autoClose={1000}></ToastContainer>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Homepage />}></Route>

          {/* registrationpart */}

          <Route path='/verificationform' element={<Otpform />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/forgotpass' element={<Forgotpass />}></Route>
          <Route path='/forgotpassotpcomp' element={<Forgotpassotpcomp />}></Route>
          <Route path='/forgotpassotpcomp' element={<Forgotpassotpcomp />}></Route>
          <Route path='/updatepass' element={<Updatepass />}></Route>

          {/* Userpart */}


          <Route path='/userhome' element={<Userhome />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/wishlist' element={<Wishlist />}></Route>
          <Route path='/singleproduct' element={<Singleproduct />}></Route>
          <Route path='/viewproductdetails' element={<Viewproductdetails />}></Route>
          <Route path='/viewproductdetails/:_id' element={<Viewproductdetails />}></Route>
          <Route path='/checkout' element={<Checkout />}></Route>
          <Route path='/productsection' element={<Productsection />}></Route>
          <Route path='/productsection/:category' element={<Productsection />}></Route>
          <Route path='/ordersuccessfull' element={<OrderSuccess />}></Route>

          {/* <Route path='/payment' element={<Payment/>}></Route> */}


          {/* profilesection */}
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/myorders' element={<Myorders />}></Route>
          <Route path='/trackorder' element={<Trackorder />}></Route>
          <Route path='/trackorder/:_id' element={<Trackorder />}></Route>
          <Route path='/rewards' element={<Rewards />}></Route>
          <Route path='/wallet' element={<Wallet />}></Route>
          <Route path='/profilefavourites' element={<Profilefavourites />}></Route>
          <Route path='/deliveryaddressess' element={<ProfileAddresses />}></Route>

          {/* Admin part */}

          <Route path='/Adminhome' element={<Admin />}></Route>
          <Route path='/Addproduct' element={<Productform />}></Route>
          <Route path='/adminallorders' element={<Adminallorderspage />}></Route>
          <Route path='/adminallusersview' element={<Adminusersviewpage />}></Route>
          <Route path='/adminordersummary' element={<Ordersummary />}></Route>


        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;



