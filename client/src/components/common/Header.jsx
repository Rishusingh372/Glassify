import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const Header = () => {
  const { user } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header style={styles.header}>
      {/* Logo */}
      <Link to="/" style={styles.logo}>
        👓 EyeGlasses
      </Link>

      {/* Navigation */}
      <nav style={styles.nav}>
        <NavLink to="/" style={styles.link}>Home</NavLink>
        <NavLink to="/cart" style={styles.link}>
          Cart ({items.length})
        </NavLink>

        {user ? (
          <>
            <NavLink to="/orders" style={styles.link}>
              My Orders
            </NavLink>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" style={styles.link}>Login</NavLink>
            <NavLink to="/signup" style={styles.link}>Signup</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 20px",
    background: "#0d6efd",
    color: "#fff",
  },
  logo: {
    color: "#fff",
    fontSize: "22px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  button: {
    background: "#fff",
    color: "#0d6efd",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
  },
};

export default Header;
