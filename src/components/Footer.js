function Footer() {
  return (
    <footer style={{ 
      backgroundColor: "#3e2723", 
      color: "white", 
      padding: "40px 20px", 
      marginTop: "50px",
      textAlign: "center" 
    }}>
      <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ marginBottom: "20px" }}>
          <h3>Desi Delight 🛍️</h3>
          <p>Bringing authentic homemade <br/> taste to your doorstep.</p>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h4>Contact Us</h4>
          <p>Email: support@desidelight.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
        <div>
          <h4>Follow Us</h4>
          <p>Instagram | Facebook</p>
        </div>
      </div>
      <hr style={{ border: "0.5px solid #5d4037", margin: "20px 0" }} />
      <p style={{ fontSize: "0.8rem" }}>© 2026 Desi Delight. All rights reserved.</p>
    </footer>
  );
}

export default Footer;