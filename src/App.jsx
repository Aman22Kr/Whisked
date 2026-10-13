import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Product from './pages/Product';
import SearchPage from './pages/SearchPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import InfoPage from './pages/InfoPage';
import { BlogList, BlogPost } from './pages/Blog';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="collections" element={<Navigate to="/collections/view-all" replace />} />
        <Route path="collections/:slug" element={<Collection />} />
        <Route path="collections/:slug/:tag" element={<Collection />} />
        <Route path="products/:slug" element={<Product />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="account" element={<Account />} />
        <Route path="pages/:slug" element={<InfoPage />} />
        <Route path="policies/:slug" element={<InfoPage />} />
        <Route path="blogs/topic" element={<BlogList />} />
        <Route path="blogs/topic/:slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
