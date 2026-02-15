import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Header from './assets/Header';
import Home from './assets/Home';
import Signup from './assets/Signup';
import Signin from './assets/Signin';
// import Signout from './assets/Signout';
import Cartitems from './assets/Cartitems';
import PrivateRoute from './assets/PrivateRoutes';
import Dashboard from './user/Dashboard';
import AdminDashboard from './admin/AdminDashboard';
import CreateCategory from './admin/CreateCategory';
import CreateProduct from './admin/CreateProduct';
import Product from './admin/Product';
import UpdateProduct from './admin/UpdateProduct';
import Orders from './user/Orders';
import AdminRoute from './assets/AdminRoutes';
import SearchItems from './assets/SearchItems';

function App() {

  return (
    <>
    <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signout' element={<Signin/>}/>
          <Route path='/cartitems' element={<Cartitems/>}/>
          <Route path='/searchitems' element={<SearchItems/>}/>
          <Route path='/Dashboard' element={<PrivateRoute/>}>
            <Route path='user' element={<Dashboard/>}/>
            <Route path='user/orders' element={<Orders/>}/>
            </Route>

          <Route path='/Dashboard' element={<AdminRoute/>}>
            <Route path='admin' element={<AdminDashboard/>}/>
            <Route path='admin/createcategory' element={<CreateCategory/>}/>
            <Route path='admin/createproduct' element={<CreateProduct/>}/>
            <Route path='admin/updateproduct/:slug' element={<UpdateProduct/>}/>
            <Route path='admin/products' element={<Product/>}/>
          </Route>

        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
