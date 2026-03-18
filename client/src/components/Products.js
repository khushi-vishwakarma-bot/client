import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Products({ addToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedWeights, setSelectedWeights] = useState({});
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get('cat');
    if (catParam) setSelectedCategory(catParam);
    else setSelectedCategory("All");
    window.scrollTo(0, 0);
  }, [location]);

  const productList = [
    { 
      id: 1, name: "Homemade Mango Pickle", category: "Pickles", 
      img: "https://binjalsvegkitchen.com/wp-content/uploads/2024/04/Instant-Mango-Pickle-H1.jpg",
      ingredients: "Hand-cut Mango, Mustard Oil", shelfLife: "12 Months",
      options: [{ weight: "250g", price: 380 }, { weight: "500g", price: 650 }, { weight: "1kg", price: 1100 }]
    },
    { 
      id: 2, name: "Traditional Besan Ladoo", category: "Sweets", 
      img: "https://www.vegrecipesofindia.com/wp-content/uploads/2013/10/besan-ladoo-recipe-1.jpg",
      ingredients: "Gram Flour, A2 Desi Ghee", shelfLife: "30 Days",
      options: [{ weight: "500g", price: 550 }, { weight: "1kg", price: 950 }]
    },
    { 
      id: 3, name: "Organic Turmeric Powder", category: "Spices", 
      img: "https://vibrantliving.in/cdn/shop/files/TurmericPowder.png?v=1731060171&width=1000",
      ingredients: "High-Curcumin Organic Roots", shelfLife: "18 Months",
      options: [{ weight: "100g", price: 220 }, { weight: "250g", price: 480 }, { weight: "500g", price: 850 }]
    },
    { 
      id: 4, name: "Pure Cow Ghee", category: "Essentials", 
      img: "https://img500.exportersindia.com/product_images/bc-500/2023/2/11629420/cow-ghee-1675937701-6754872.jpeg",
      ingredients: "Bilona Method Cow Milk Fat", shelfLife: "12 Months",
      options: [{ weight: "500ml", price: 850 }, { weight: "1Ltr", price: 1600 }]
    },
    { 
      id: 5, name: "Kashmiri Saffron (1g)", category: "Spices", 
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNUOpfiQSZ-aWduzd6MiFpIJ8SIV7cIgYm7w&s",
      ingredients: "Grade A++ Pure Strands", shelfLife: "24 Months",
      options: [{ weight: "1g", price: 499 }, { weight: "2g", price: 899 }]
    },
    { 
      id: 6, name: "Special Chai Masala", category: "Spices", 
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRwqeIDDl845yyESbttxdaP46aJOxUGQtt4A&s",
      ingredients: "Ginger, Cardamom, Cinnamon", shelfLife: "12 Months",
      options: [{ weight: "50g", price: 250 }, { weight: "100g", price: 450 }]
    },
    { 
      id: 7, name: "Spicy Garlic Chutney", category: "Pickles", 
      img: "https://sinfullyspicy.com/wp-content/uploads/2024/06/1200-by-1200-images-1.jpg",
      ingredients: "Red Chili, Garlic, Cumin", shelfLife: "6 Months",
      options: [{ weight: "200g", price: 180 }, { weight: "500g", price: 380 }]
    },
    { 
      id: 8, name: "Roasted Makhana", category: "Snacks", 
      img: "https://5.imimg.com/data5/DH/VA/MY-66922254/roasted-makhana.jpg",
      ingredients: "Popped Fox Nuts, Pure Ghee", shelfLife: "3 Months",
      options: [{ weight: "100g", price: 280 }, { weight: "250g", price: 580 }]
    },
    { 
      id: 9, name: "Amla Murabba", category: "Pickles", 
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFej_mYKZyN8HG1dK9coDHjjL3zEvvsWxrAA&s",
      ingredients: "Wild Forest Amla, Sugar Syrup", shelfLife: "12 Months",
      options: [{ weight: "500g", price: 420 }, { weight: "1kg", price: 750 }]
    },
    { 
      id: 10, name: "Dry Fruit Barfi", category: "Sweets", 
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQhn7EuqYrmDqNPWgSHJPchI_YN_hNTpsbpw&s",
      ingredients: "Cashews, Figs, Saudi Dates", shelfLife: "20 Days",
      options: [{ weight: "250g", price: 680 }, { weight: "500g", price: 1250 }]
    },
    { 
      id: 11, name: "Moong Dal Halwa Mix", category: "Sweets", 
      img: "https://images.getrecipekit.com/20221019114738-moong-20dal-20halwa.jpg?aspect_ratio=16:9&quality=90&",
      ingredients: "Yellow Moong, Desi Ghee", shelfLife: "6 Months",
      options: [{ weight: "200g", price: 320 }, { weight: "500g", price: 680 }]
    },
    { 
      id: 12, name: "Pink Himalayan Salt", category: "Essentials", 
      img: "https://zamaorganics.com/cdn/shop/articles/Untitled_design_-_2024-01-27T122741.226.png?v=1706339238",
      ingredients: "Pure Mineral Rich Rock Salt", shelfLife: "Indefinite",
      options: [{ weight: "500g", price: 150 }, { weight: "1kg", price: 260 }]
    },
    { 
      id: 13, name: "Organic Red Poha", category: "Essentials", 
      img: "https://organicmandya.com/cdn/shop/files/Red_Poha_Thin.jpg?v=1757083849",
      ingredients: "Red Rice Flakes, Iron Rich", shelfLife: "6 Months",
      options: [{ weight: "500g", price: 180 }, { weight: "1kg", price: 320 }]
    },
    { 
      id: 14, name: "Jaggery Powder (Gud)", category: "Essentials", 
      img: "https://cdn1.healthians.com/blog/wp-content/uploads/2025/05/Jaggery-Benefits.png",
      ingredients: "Chemical-free Sugarcane", shelfLife: "12 Months",
      options: [{ weight: "500g", price: 190 }, { weight: "1kg", price: 350 }]
    },
    { 
      id: 15, name: "Cold Pressed Coconut Oil", category: "Essentials", 
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGsI_31LVPhNjL1Yg_F_9bEmzZZrja-SU9HA&s",
      ingredients: "Fresh Copra Cold Extraction", shelfLife: "12 Months",
      options: [{ weight: "500ml", price: 580 }, { weight: "1Ltr", price: 1050 }]
    },
    { 
      id: 16, name: "Masala Peanuts", category: "Snacks", 
      img: "https://dinedelicious.in/wp-content/uploads/2019/10/Masala-Peanuts-2-500x375.jpg",
      ingredients: "Peanuts, Besan, Spices", shelfLife: "2 Months",
      options: [{ weight: "200g", price: 150 }, { weight: "500g", price: 320 }]
    },
    { 
      id: 17, name: "Sabudana Papad", category: "Snacks", 
      img: "https://bazaarmantri.com/images/products/40610.jpg",
      ingredients: "Premium Sago, Rock Salt", shelfLife: "12 Months",
      options: [{ weight: "250g", price: 190 }, { weight: "500g", price: 350 }]
    },
    { 
      id: 18, name: "Thandai Mix Powder", category: "Sweets", 
      img: "https://maayeka.com/wp-content/uploads/2018/02/thandai-masala-powder-recipe-1.jpg.webp",
      ingredients: "Pistachios, Rose, Fennel", shelfLife: "4 Months",
      options: [{ weight: "100g", price: 380 }, { weight: "250g", price: 850 }]
    },
    { 
      id: 19, name: "Black Pepper (Whole)", category: "Spices", 
      img: "https://www.pepperhub.in/wp-content/uploads/2023/08/Black-pepper-powder-online-Shop-Now.webp",
      ingredients: "Tellicherry Bold Pepper", shelfLife: "24 Months",
      options: [{ weight: "100g", price: 290 }, { weight: "250g", price: 650 }]
    },
    { 
      id: 20, name: "Natural Rose Water", category: "Essentials", 
      img: "https://5.imimg.com/data5/SELLER/Default/2024/3/404218761/MS/YQ/DZ/12999747/rose-water-500x500.jpg",
      ingredients: "Steam Distilled Roses", shelfLife: "12 Months",
      options: [{ weight: "200ml", price: 350 }, { weight: "500ml", price: 750 }]
    },
    { 
      id: 21, name: "Ajwain (Carom Seeds)", category: "Spices", 
      img: "https://chakkiwalle.com/cdn/shop/files/71u6lj9WHBS._AC_UF1000_1000_QL80_02a40313-a1f4-49ef-9440-9a2a2cdfd77d.jpg?v=1707807342",
      ingredients: "Sun-dried Organic Seeds", shelfLife: "18 Months",
      options: [{ weight: "100g", price: 120 }, { weight: "250g", price: 280 }]
    }
  ];

  const handleWeightChange = (productId, index) => {
    setSelectedWeights(prev => ({ ...prev, [productId]: parseInt(index) }));
  };

  const filtered = productList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Pickles", "Sweets", "Spices", "Snacks", "Essentials"];

  return (
    <div style={{ padding: '20px 15px', background: '#fff9f7', minHeight: '100vh' }}>
      
      {/* Compact Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#d15a5a', fontSize: '2.2rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', margin: '0' }}>
          Desi Delights
        </h2>
        <p style={{ color: '#8b4513', fontSize: '0.9rem', marginTop: '5px' }}>Authentic Desi Products</p>
      </div>
      
      {/* Smaller Search Bar */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <input 
          placeholder="Search delicacies..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            padding: '12px 20px', width: '100%', maxWidth: '450px', borderRadius: '25px', 
            border: '1px solid #eee', fontSize: '1rem', outline: 'none',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)', background: 'white'
          }}
        />
      </div>

      {/* Small Category Filter */}
      <div style={{ textAlign: 'center', marginBottom: '30px', display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)}
            style={{ 
              padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem',
              border: selectedCategory === cat ? 'none' : '1px solid #d15a5a', 
              backgroundColor: selectedCategory === cat ? '#d15a5a' : 'transparent', 
              color: selectedCategory === cat ? 'white' : '#d15a5a', 
              cursor: 'pointer', fontWeight: 'bold'
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Compact Grid with Smaller Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
        gap: '20px', 
        padding: '0 10px' 
      }}>
        {filtered.map(product => {
          const selectedIndex = selectedWeights[product.id] || 0;
          const currentOption = product.options[selectedIndex];

          return (
            <div key={product.id} style={{ 
              background: 'white', padding: '15px', borderRadius: '20px', 
              border: '1px solid #f0f0f0', boxShadow: '0 8px 20px rgba(0,0,0,0.04)', 
              display: 'flex', flexDirection: 'column', transition: 'transform 0.2s'
            }}>
              {/* Smaller Image Height */}
              <div style={{ overflow: 'hidden', borderRadius: '12px', height: '160px', marginBottom: '12px' }}>
                <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <h4 style={{ margin: '0', color: '#333', fontSize: '1.1rem', fontWeight: '700', lineHeight: '1.2' }}>{product.name}</h4>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0' }}>
                <span style={{ color: '#d15a5a', background: '#fff0ec', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold' }}>{product.category}</span>
                <span style={{ color: '#333', fontWeight: '800', fontSize: '1.1rem' }}>₹{currentOption.price}</span>
              </div>

              {/* Smaller Select Menu */}
              <div style={{ marginBottom: '10px' }}>
                <select value={selectedIndex} onChange={(e) => handleWeightChange(product.id, e.target.value)}
                  style={{ width: '100%', padding: '6px', borderRadius: '10px', border: '1px solid #eee', background: '#fafafa', fontSize: '0.8rem', cursor: 'pointer' }}>
                  {product.options.map((opt, idx) => (
                    <option key={idx} value={idx}>{opt.weight} — ₹{opt.price}</option>
                  ))}
                </select>
              </div>

              {/* Minimal Ingredients */}
              <p style={{ margin: '0', fontSize: '0.75rem', color: '#777', flexGrow: '1', fontStyle: 'italic' }}>
                {product.ingredients}
              </p>
              
              {/* Compact Button */}
              <button onClick={() => addToCart({ ...product, price: `₹${currentOption.price}`, selectedWeight: currentOption.weight })} 
                style={{ 
                  background: 'linear-gradient(to right, #ff7e5f, #feb47b)', 
                  color: 'white', border: 'none', padding: '10px', borderRadius: '12px', 
                  cursor: 'pointer', fontWeight: 'bold', marginTop: '12px', fontSize: '0.9rem',
                  boxShadow: '0 4px 10px rgba(255, 126, 95, 0.2)'
                }}>
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;