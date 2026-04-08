import React from 'react';

function About() {
  return (
    <div style={pageContainerStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* --- MAIN HEADER SECTION --- */}
        <h1 style={mainHeaderStyle}>DESI DELIGHTS</h1>
        <p style={subHeaderStyle}>Authentic Desi Products</p>

        {/* --- STORY SECTION --- */}
        <h2 style={storyTitleStyle}>
          The Story of Desi Delight: Our Commitment to Tradition and Quality.
        </h2>
        <p style={introTextStyle}>
          Desi Delight is a celebration of authentic Indian culinary heritage. Our mission is to preserve time-honored flavors and bring the true taste of a traditional, homemade meal to your modern home. Rooted in deep respect for tradition, we believe that food is not just nourishment, but a profound cultural connection and a language of love shared through the ages.
        </p>

        {/* --- THREE-COLUMN CARDS SECTION --- */}
        <div style={storyGridStyle}>
          
          {/* Card 1: Our Roots */}
          <div style={cardStyle}>
            <div style={graphicsRowStyle}>
              <div style={iconCircleStyle}>🥣</div>
              <div style={iconCircleStyle}>🌿</div>
            </div>
            <h3 style={cardMainHeadingStyle}>Our Roots</h3>
            <h4 style={cardSubHeadingStyle}>Preserving Culinary<br/>Craftsmanship</h4>
            <p style={cardTextStyle}>
              Desi Delight was born from a desire to reclaim the rich tapestry of regional Indian flavors. From cherished family recipes to a curated collection, we honor artisanal processes made with care and dedication, rejecting mass-production compromise.
            </p>
          </div>

          {/* Card 2: Our Standard */}
          <div style={cardStyle}>
            <div style={graphicsRowStyle}>
              <div style={iconCircleStyle}>🪴</div>
              <div style={iconCircleStyle}>🍅</div>
            </div>
            <h3 style={cardMainHeadingStyle}>Our Standard</h3>
            <h4 style={cardSubHeadingStyle}>Purity on a Plate. From Farm to<br/>Fork, Without Compromise.</h4>
            <p style={cardTextStyle}>
              Quality is our promise. We meticulously source only premium, farm-fresh ingredients and handcrafted spices. We are uncompromisingly committed to zero artificial preservatives, ensuring every bite is wholesome, true, and wholesome.
            </p>
          </div>

          {/* Card 3: Our Table */}
          <div style={cardStyle}>
            <div style={graphicsRowStyle}>
              <div style={iconCircleStyle}>👨‍👩‍👧‍👦</div>
              <div style={iconCircleStyle}>🍛</div>
            </div>
            <h3 style={cardMainHeadingStyle}>Our Table</h3>
            <h4 style={cardSubHeadingStyle}>A Tradition of Taste, Shared With<br/>You. Welcome to the Family Table.</h4>
            <p style={cardTextStyle}>
              When you bring Desi Delight home, you're sharing in a legacy of hospitality and communal joy. Our products are made with love, for your family, with the absolute assurance of quality and safety. Welcome home.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- STYLES ---

const pageContainerStyle = {
  backgroundColor: '#fdfbf7', // Warm, creamy background from the image
  padding: '60px 20px 100px 20px',
  minHeight: '100vh',
  fontFamily: "'Poppins', 'Crimson Pro', serif, sans-serif",
  textAlign: 'center',
};

const mainHeaderStyle = {
  color: '#8c2121', // Deep Red
  fontSize: '3.5rem',
  fontWeight: '900',
  letterSpacing: '2px',
  margin: '0 0 5px 0',
  textTransform: 'uppercase',
};

const subHeaderStyle = {
  color: '#4a3320', // Dark brownish color
  fontSize: '1.2rem',
  fontWeight: '500',
  margin: '0 0 40px 0',
};

const storyTitleStyle = {
  color: '#a36b27', // Golden-brown color
  fontSize: '1.5rem',
  fontWeight: '600',
  marginBottom: '15px',
};

const introTextStyle = {
  fontSize: '1.05rem',
  color: '#333',
  lineHeight: '1.6',
  maxWidth: '900px',
  margin: '0 auto 50px auto',
};

const storyGridStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '30px',
  flexWrap: 'wrap',
};

const cardStyle = {
  flex: '1 1 320px',
  backgroundColor: '#ffffff',
  padding: '40px 30px',
  borderRadius: '20px',
  boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
  border: '1px solid #f0ede6',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const graphicsRowStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
  marginBottom: '25px',
};

// Placeholder for the circular image/icons in your screenshot
const iconCircleStyle = {
  width: '65px',
  height: '65px',
  borderRadius: '50%',
  backgroundColor: '#fcf8f2',
  border: '2px solid #eae1d5',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '2rem',
  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
};

const cardMainHeadingStyle = {
  color: '#4a3320', // Dark brown
  fontSize: '1.6rem',
  fontWeight: '700',
  margin: '0 0 10px 0',
};

const cardSubHeadingStyle = {
  color: '#333',
  fontSize: '1rem',
  fontWeight: '700',
  margin: '0 0 15px 0',
  minHeight: '45px', // Keeps titles aligned even if lengths vary
};

const cardTextStyle = {
  fontSize: '0.95rem',
  color: '#555',
  lineHeight: '1.6',
  margin: '0',
};

export default About;