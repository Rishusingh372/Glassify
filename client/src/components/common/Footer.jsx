const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} EyeGlasses Store</p>
      <p>All rights reserved</p>
    </footer>
  );
};

const styles = {
  footer: {
    marginTop: "40px",
    padding: "15px",
    textAlign: "center",
    background: "#f1f1f1",
    color: "#555",
  },
};

export default Footer;
