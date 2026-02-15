import React from "react";
import { NavLink } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

function AdminMenu() {
  return (
    <div>
      <ListGroup className="mt-5">
        <NavLink
          to="/Dashboard/admin/createcategory"
          className="list-group-item"
        >
          Create Category
        </NavLink>
        <NavLink to="/Dashboard/admin/createproduct" className="list-group-item">
          Create Product
        </NavLink>
        <NavLink to="/Dashboard/admin/products" className="list-group-item">
          Products
        </NavLink>
      </ListGroup>
    </div>
  );
}

export default AdminMenu;
