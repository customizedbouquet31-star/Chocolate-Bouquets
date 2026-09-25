import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';
import SplashScreen from './components/common/SplashScreen';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Collection from './pages/Collection';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import Products from './pages/admin/Products';
import Categories from './pages/admin/Categories';
import Reels from './pages/admin/Reels';
import CustomerLogin from './pages/CustomerLogin';
import ProfileLayout from './pages/ProfileLayout';
import { ProfileOrders, ProfileWishlist, ProfileAddresses, ProfileCards } from './pages/ProfilePages';

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <SplashScreen />
        <BrowserRouter>
          <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collection/:categoryId" element={<Collection />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          
          <Route path="/profile" element={<ProfileLayout />}>
            <Route path="orders" element={<ProfileOrders />} />
            <Route path="wishlist" element={<ProfileWishlist />} />
            <Route path="addresses" element={<ProfileAddresses />} />
            <Route path="cards" element={<ProfileCards />} />
          </Route>
        </Route>
        
        <Route path="/login" element={<CustomerLogin />} />
        
        <Route path="/admin" element={<Login />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/reels" element={<Reels />} />
        </Route>
        </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
