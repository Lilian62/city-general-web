import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // NEW: State for visibility toggle
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  
  const [welcomeText, setWelcomeText] = useState("");
  const [heroFile, setHeroFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Low voltage');
  const [image, setImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ["Low voltage", "Instruments and Meters", "Solar Panels", "Generators", "Our Field work"];

  const createSlug = (text) => {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');  
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/products/login', { password });
      if (response.data.success) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      alert("Access Denied: Incorrect Password");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const pRes = await axios.get('http://localhost:5000/api/products');
      const sRes = await axios.get('http://localhost:5000/api/products/settings');
      setProducts(pRes.data);
      if (sRes.data) setWelcomeText(sRes.data.welcomeText || "");
    } catch (err) { console.error("Error fetching data", err); }
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [isAuthenticated, fetchData]);

  const handleUpdateHero = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('welcomeText', welcomeText);
    if (heroFile) formData.append('heroElement', heroFile);
    try {
      await axios.post('http://localhost:5000/api/products/settings', formData);
      alert("Hero Section Updated!");
    } catch (err) { alert("Failed to update Hero"); }
    finally { setLoading(false); }
  };

  const handleUploadProduct = async (e) => {
    e.preventDefault();
    if (!name || !image || !description) return alert("All fields are required!");
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('slug', createSlug(name)); 
    formData.append('description', description);
    formData.append('category', category);
    formData.append('image', image);
    try {
      await axios.post('http://localhost:5000/api/products', formData);
      alert("Product Added!");
      setName(''); setDescription(''); setImage(null); 
      fetchData(); 
    } catch (err) { alert("Upload failed."); }
    finally { setLoading(false); }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchData(); 
      } catch (err) { alert("Delete failed."); }
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // --- LOGIN UI WITH TOGGLE ---
  if (!isAuthenticated) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)', fontFamily: 'sans-serif' }}>
        <form onSubmit={handleLogin} style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', width: '100%', maxWidth: '380px', textAlign: 'center' }}>
          <div style={{ fontSize: '50px', marginBottom: '10px' }}>🔒</div>
          <h2 style={{ color: '#333', marginBottom: '5px' }}>Admin Login</h2>
          <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '25px' }}>City General Appliances Portal</p>
          
          {/* PASSWORD INPUT WITH TOGGLE */}
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <input 
              type={showPassword ? "text" : "password"} // Switches type
              autoFocus 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter Password" 
              style={{ 
                width: '100%', 
                padding: '12px 45px 12px 12px', // Space for icon on the right
                borderRadius: '8px', 
                border: '1px solid #ddd', 
                boxSizing: 'border-box', 
                fontSize: '1rem', 
                textAlign: 'center' 
              }} 
            />
            <span 
              onClick={() => setShowPassword(!showPassword)}
              style={{ 
                position: 'absolute', 
                right: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                cursor: 'pointer',
                fontSize: '1.2rem',
                userSelect: 'none'
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', padding: '12px', background: '#3498db', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {loading ? "Checking..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'sans-serif', color: '#333' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>Admin Control Panel</h1>
        <button onClick={() => setIsAuthenticated(false)} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold' }}>Logout</button>
      </div>
      <hr style={{ border: '0', height: '1px', background: '#eee', marginBottom: '30px' }} />
      
      {/* Update Hero Section */}
      <section style={{ background: '#f8f9fa', padding: '25px', marginBottom: '30px', borderRadius: '12px', border: '1px solid #e9ecef' }}>
        <h3 style={{ marginTop: 0 }}>Update Hero Section</h3>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <input type="text" value={welcomeText} onChange={(e)=>setWelcomeText(e.target.value)} placeholder="Welcome Text..." style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
          <input type="file" onChange={(e)=>setHeroFile(e.target.files[0])} />
          <button onClick={handleUpdateHero} disabled={loading} style={{ background: '#3498db', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Save Changes</button>
        </div>
      </section>

      {/* Add New Product */}
      <section style={{ background: '#fff', padding: '25px', borderRadius: '12px', border: '1px solid #e9ecef', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginTop: 0 }}>Add New Product</h3>
        <div style={{ display: 'grid', gap: '15px' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <input type="text" placeholder="Product Name" value={name} onChange={(e)=>setName(e.target.value)} style={{ flex: 2, padding: '12px', borderRadius: '5px', border: '1px solid #ddd' }} />
            <select value={category} onChange={(e)=>setCategory(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '5px', border: '1px solid #ddd' }}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.8rem', display: 'block', color: '#666' }}>Product Image:</label>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
          </div>
          <textarea placeholder="Detailed product description..." value={description} onChange={(e)=>setDescription(e.target.value)} style={{ height: '100px', padding: '12px', borderRadius: '5px', border: '1px solid #ddd', fontFamily: 'inherit' }} />
          <button onClick={handleUploadProduct} disabled={loading} style={{ background: '#27ae60', color: 'white', padding: '14px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>
            {loading ? "Processing..." : " Upload Product to Inventory"}
          </button>
        </div>
      </section>

      {/* Inventory Table */}
      <section style={{ marginTop: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h3 style={{ margin: 0 }}>Current Inventory ({filteredProducts.length})</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" placeholder="🔍 Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '10px 15px', width: '250px', borderRadius: '25px', border: '1px solid #ddd', outline: 'none' }} />
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}>
              <option value="All">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #eee' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: 'white' }}>
            <thead>
              <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '15px' }}>Preview</th>
                <th>Product Details</th>
                <th>Category</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(p => (
                <tr key={p._id} style={{ borderBottom: '1px solid #f1f1f1' }}>
                  <td style={{ padding: '15px' }}>
                    <img src={`http://localhost:5000${p.imageUrl}`} width="60" height="60" style={{ objectFit: 'contain', borderRadius: '5px', border: '1px solid #eee' }} alt="" />
                  </td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>{p.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#7f8c8d', maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.description}</div>
                  </td>
                  <td><span style={{ background: '#ebf5fb', color: '#3498db', padding: '4px 10px', borderRadius: '15px', fontSize: '0.85rem' }}>{p.category}</span></td>
                  <td style={{ textAlign: 'center' }}>
                    <button onClick={() => deleteProduct(p._id)} style={{ background: '#fdecea', color: '#e74c3c', border: '1px solid #fadbd8', padding: '6px 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.9rem' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;