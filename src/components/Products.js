import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Products({ addToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Access the URL location to check for category parameters
  const location = useLocation();

  // Listen for changes in the URL (e.g., when coming from Home.js categories)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get('cat'); // Matches the 'cat' key used in Home.js
    
    if (catParam) {
      setSelectedCategory(catParam);
    } else {
      setSelectedCategory("All");
    }
    // Scroll to top when the category changes
    window.scrollTo(0, 0);
  }, [location]);

  const productList = [
    { 
      id: 1, 
      name: "Homemade Mango Pickle", 
      price: "₹250", 
      category: "Pickles", 
      img: "https://binjalsvegkitchen.com/wp-content/uploads/2024/04/Instant-Mango-Pickle-H1.jpg",
      ingredients: "Raw Mango, Mustard Oil, Fenugreek, Turmeric, Chili Powder",
      shelfLife: "12 Months",
      storage: "Store in a cool, dry place. Use a dry spoon."
    },
    { 
      id: 2, 
      name: "Traditional Besan Ladoo", 
      price: "₹400", 
      category: "Sweets", 
      img: "https://www.vegrecipesofindia.com/wp-content/uploads/2013/10/besan-ladoo-recipe-1.jpg",
      ingredients: "Gram Flour (Besan), Pure Cow Ghee, Sugar, Cardamom, Almonds",
      shelfLife: "30 Days",
      storage: "Keep in an airtight container at room temperature."
    },
    { 
      id: 3, 
      name: "Organic Turmeric Powder", 
      price: "₹150", 
      category: "Spices", 
      img: "https://vibrantliving.in/cdn/shop/files/TurmericPowder.png?v=1731060171&width=1000",
      ingredients: "100% Organic Turmeric Roots",
      shelfLife: "18 Months",
      storage: "Store in a dark, airtight glass jar."
    },
    { 
      id: 4, 
      name: "Pure Cow Ghee (500ml)", 
      price: "₹650", 
      category: "Essentials", 
      img: "https://img500.exportersindia.com/product_images/bc-500/2023/2/11629420/cow-ghee-1675937701-6754872.jpeg",
      ingredients: "Churned Cow Milk Fat",
      shelfLife: "9 Months",
      storage: "No refrigeration needed. Keep in a cool place."
    },
    { 
      id: 5, 
      name: "Kashmiri Saffron (1g)", 
      price: "₹350", 
      category: "Spices", 
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNUOpfiQSZ-aWduzd6MiFpIJ8SIV7cIgYm7w&s",
      ingredients: "Pure Kashmiri Saffron Strands",
      shelfLife: "24 Months",
      storage: "Keep away from direct sunlight in a dry place."
    },
    { 
      id: 6, 
      name: "Special Chai Masala", 
      price: "₹180", 
      category: "Spices", 
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRwqeIDDl845yyESbttxdaP46aJOxUGQtt4A&s",
      ingredients: "Dry Ginger, Cardamom, Black Pepper, Cinnamon, Cloves",
      shelfLife: "12 Months",
      storage: "Store in an airtight container to preserve aroma."
    },
    { 
      id: 7, 
      name: "Spicy Garlic Chutney", 
      price: "₹120", 
      category: "Pickles", 
      img: "https://sinfullyspicy.com/wp-content/uploads/2024/06/1200-by-1200-images-1.jpg",
      ingredients: "Garlic, Red Chili, Cumin, Salt, Lemon Juice",
      shelfLife: "6 Months",
      storage: "Refrigerate after opening for best taste."
    },
    { 
      id: 8, 
      name: "Roasted Makhana", 
      price: "₹200", 
      category: "Snacks", 
      img: "https://5.imimg.com/data5/DH/VA/MY-66922254/roasted-makhana.jpg",
      ingredients: "Fox Nuts, Ghee, Black Salt, Pepper",
      shelfLife: "3 Months",
      storage: "Keep in a moisture-free airtight packet."
    },
    { id: 9, name: "Amla Murabba", price: "₹300", category: "Pickles", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFej_mYKZyN8HG1dK9coDHjjL3zEvvsWxrAA&s", ingredients: "Amla, Sugar Syrup, Cardamom", shelfLife: "12 Months", storage: "Cool and dry place." },
    { id: 10, name: "Dry Fruit Barfi", price: "₹550", category: "Sweets", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQhn7EuqYrmDqNPWgSHJPchI_YN_hNTpsbpw&s", ingredients: "Cashews, Figs, Dates, Pistachios", shelfLife: "20 Days", storage: "Keep refrigerated." },
    { id: 11, name: "Moong Dal Halwa Mix", price: "₹220", category: "Sweets", img: "https://images.getrecipekit.com/20221019114738-moong-20dal-20halwa.jpg?aspect_ratio=16:9&quality=90&", ingredients: "Moong Dal, Ghee, Sugar, Saffron", shelfLife: "6 Months", storage: "Store in a dry place." },
    { id: 12, name: "Pink Himalayan Salt", price: "₹90", category: "Essentials", img: "https://zamaorganics.com/cdn/shop/articles/Untitled_design_-_2024-01-27T122741.226.png?v=1706339238", ingredients: "Pure Himalayan Rock Salt", shelfLife: "Indefinite", storage: "Dry place." },
    { id: 13, name: "Organic Red Poha", price: "₹110", category: "Essentials", img: "https://organicmandya.com/cdn/shop/files/Red_Poha_Thin.jpg?v=1757083849", ingredients: "Red Rice Flakes", shelfLife: "6 Months", storage: "Airtight container." },
    { id: 14, name: "Jaggery Powder (Gud)", price: "₹140", category: "Essentials", img: "https://cdn1.healthians.com/blog/wp-content/uploads/2025/05/Jaggery-Benefits.png", ingredients: "Sugarcane Juice", shelfLife: "12 Months", storage: "Keep away from moisture." },
    { id: 15, name: "Cold Pressed Coconut Oil", price: "₹450", category: "Essentials", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGsI_31LVPhNjL1Yg_F_9bEmzZZrja-SU9HA&s", ingredients: "Fresh Coconut Milk", shelfLife: "12 Months", storage: "Store in a cool, dark place." },
    { id: 16, name: "Masala Peanuts", price: "₹100", category: "Snacks", img: "https://dinedelicious.in/wp-content/uploads/2019/10/Masala-Peanuts-2-500x375.jpg", ingredients: "Peanuts, Besan, Spices", shelfLife: "2 Months", storage: "Airtight container." },
    { id: 17, name: "Sabudana Papad", price: "₹130", category: "Snacks", img: "https://bazaarmantri.com/images/products/40610.jpg", ingredients: "Sago, Salt, Chili Flakes", shelfLife: "12 Months", storage: "Keep in a dry jar." },
    { id: 18, name: "Thandai Mix Powder", price: "₹280", category: "Sweets", img: "https://maayeka.com/wp-content/uploads/2018/02/thandai-masala-powder-recipe-1.jpg.webp", ingredients: "Almonds, Fennel, Melon Seeds, Pepper", shelfLife: "4 Months", storage: "Refrigerate for freshness." },
    { id: 19, name: "Black Pepper (Whole)", price: "₹190", category: "Spices", img: "https://www.pepperhub.in/wp-content/uploads/2023/08/Black-pepper-powder-online-Shop-Now.webp", ingredients: "Dried Peppercorns", shelfLife: "24 Months", storage: "Dry container." },
    { id: 20, name: "Natural Rose Water", price: "₹210", category: "Essentials", img: "https://5.imimg.com/data5/SELLER/Default/2024/3/404218761/MS/YQ/DZ/12999747/rose-water-500x500.jpg", ingredients: "Rose Petals, Distilled Water", shelfLife: "12 Months", storage: "Cool place." },
    { id: 21, name: "Ajwain (Carom Seeds)", price: "₹85", category: "Spices", img: "https://chakkiwalle.com/cdn/shop/files/71u6lj9WHBS._AC_UF1000_1000_QL80_02a40313-a1f4-49ef-9440-9a2a2cdfd77d.jpg?v=1707807342", ingredients: "Dried Carom Seeds", shelfLife: "18 Months", storage: "Dry place." }
  ];

  const filtered = productList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Pickles", "Sweets", "Spices", "Snacks", "Essentials"];

  return (
    <div style={{ padding: '20px', backgroundColor: '#fdf5e6', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', color: '#8B4513', fontSize: '2.5rem', marginBottom: '10px' }}>Authentic Desi Products</h2>
      
      {/* Search Input */}
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <input 
          placeholder="Search for something delicious..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            padding: '12px 25px', 
            width: '50%', 
            borderRadius: '30px', 
            border: '2px solid #8B4513',
            fontSize: '1.1rem',
            outline: 'none',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}
        />
      </div>

      {/* Category Filter Buttons */}
      <div style={{ textAlign: 'center', marginBottom: '30px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: '1px solid #8B4513',
              backgroundColor: selectedCategory === cat ? '#8B4513' : 'transparent',
              color: selectedCategory === cat ? 'white' : '#8B4513',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: '0.3s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '30px',
        padding: '10px' 
      }}>
        {filtered.length > 0 ? (
          filtered.map(product => (
            <div key={product.id} className="product-card" style={{ 
              border: '1px solid #eee', 
              padding: '20px', 
              borderRadius: '20px', 
              textAlign: 'left',
              backgroundColor: 'white',
              boxShadow: '0 6px 12px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <img 
                src={product.img} 
                alt={product.name} 
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '15px' }} 
              />
              <h4 style={{ margin: '15px 0 5px', color: '#333', fontSize: '1.2rem' }}>{product.name}</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>{product.category}</p>
                <p style={{ color: '#8B4513', fontWeight: 'bold', fontSize: '1.2rem', margin: 0 }}>{product.price}</p>
              </div>

              {/* PRODUCT DETAILS BOX */}
              <div style={{ 
                backgroundColor: '#fff9f0', 
                padding: '10px', 
                borderRadius: '10px', 
                marginTop: '15px',
                fontSize: '0.85rem',
                borderLeft: '4px solid #FFD700'
              }}>
                <p style={{ margin: '2px 0' }}><strong>🌿 Ingredients:</strong> {product.ingredients}</p>
                <p style={{ margin: '2px 0' }}><strong>⏳ Shelf-life:</strong> {product.shelfLife}</p>
                <p style={{ margin: '2px 0' }}><strong>📦 Storage:</strong> {product.storage}</p>
              </div>
              
              <button 
                onClick={() => addToCart(product)} 
                style={{ 
                  backgroundColor: '#8B4513', 
                  color: 'white', 
                  border: 'none', 
                  padding: '12px 25px', 
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginTop: '15px',
                  width: '100%',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#fecc02'; 
                  e.target.style.color = '#8B4513'; 
                  e.target.style.transform = 'translateY(-2px)'; 
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#8B4513'; 
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: '#8B4513' }}>
            <h3>No products found in this category.</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;