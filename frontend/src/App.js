import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import AdminDashboard from './pages/AdminDashboard'; // You imported this
import ProductDetail from './pages/ProductDetail'; 
import NotFound from './pages/NotFound'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategoryPage />} />
        
        {/* Fix is here: Changed Dashboard to AdminDashboard */}
        <Route path="/city-hq-portal-2026" element={<AdminDashboard />} />
        
        <Route path="/product/:slug" element={<ProductDetail />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;