import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Navigate, NavLink } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import SearchInput from "./SearchInput";

function Header() {
  const { auth, setAuth } = useAuth();
  const {cart}=useCart();

  function handleLogout() {
    localStorage.removeItem("auth");
    setAuth({
      user: null,
      token: "",
    });
  }

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand to="/">Online Shopping</Navbar.Brand>
          <SearchInput/>
          <Nav className="ms-auto">
            <NavLink to="/">Home</NavLink>
            {!auth.user ? (
              <>
                <NavLink to="/signup">Sign Up</NavLink>
                <NavLink to="/signin">Sign In</NavLink>
              </>
            ) : (
              <>
                <NavDropdown title={auth.user.name} id="basic-nav-dropdown">
                  <NavLink
                    to={`/Dashboard/${auth.user.role === 1 ? "admin" : "user"}`}
                    className="dropdown-item"
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/signin"
                    onClick={handleLogout}
                    className="dropdown-item"
                  >
                    Sign Out
                  </NavLink>
                </NavDropdown>
              </>
            )}

            <NavLink to="/cartitems">
              <IoMdCart /><sup>{cart.length}</sup>
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
