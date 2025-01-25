import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import { Cart } from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductPage from './pages/ProductPage';
import './App.css';
import { RequireAuth } from './utility/requireAuth';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <>
    <Router>
      <Routes>
        
          <Route path='' 
          element={
            <CartProvider>
              <Home/>
            </CartProvider>
          }
          />
          <Route path='/' 
          element={
            <CartProvider>
              <Home/>
            </CartProvider>
          }
          />

          <Route path='/cart' 
          element={
            <RequireAuth>
              <CartProvider>
                <Cart/>
              </CartProvider>
            </RequireAuth>
          }
          />

          <Route path="/product/:type" 
          element={
            <CartProvider>
              <ProductPage />
            </CartProvider>
          } 
          />

          <Route path="/login"
          element={
            <CartProvider>
              <Login/>
            </CartProvider>
          }
          />

          <Route path="/register"
          element={
            <CartProvider>
              <Register/>
            </CartProvider>
          }
          />

      </Routes>

    </Router>
    </>
  );
}

export default App;
