import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import AdminDashboard from './pages/AdminDashboard';
import ProductDetail from './pages/ProductDetail'; 
import NotFound from './pages/NotFound'; // Import the new page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategoryPage />} />
        
        {/* You can rename '/admin' to something secret here if you wish */}
        <Route path="/city-hq-portal-2026" element={<Dashboard />} />
        
        <Route path="/product/:slug" element={<ProductDetail />} />

        {/* CATCH-ALL ROUTE: This must be the LAST route in the list */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;