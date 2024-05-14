
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

function App() {
  return (

    <>

      <ToastContainer limit={1} autoClose={3000}></ToastContainer>
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


          {/* Admin part */}

          <Route path='/Adminhome' element={<Admin />}></Route>
          <Route path='/Addproduct' element={<Productform />}></Route>


        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;



