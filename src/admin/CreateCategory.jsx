import React, { useEffect } from "react";
import AdminMenu from "../assets/AdminMenu";
import { useState } from "react";
import CategoryForm from "../assets/CategoryForm";
import { useAuth } from "../context/auth";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CreateCategory() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [updatedName, setUpdatedName] = useState("");
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { auth } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    let data = { name };
    fetch("https://ecom-app-u73g.onrender.com/category/create-category", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: auth.token,
      },
      body: JSON.stringify(data),
    }).then((res1) => {
      res1.json().then((res2) => {
        console.log(res2);
        getAllCategories();
      });
    });
  }

  function getAllCategories() {
    fetch("https://ecom-app-u73g.onrender.com").then((res1) => {
      res1.json().then((res2) => {
        console.log(res2);
        setCategories(res2.categories);
      });
    });
  }

  useEffect(() => {
    getAllCategories();
  });

  function handleUpdate(e){
    e.preventDefault();
    let data = { name: updatedName };
    fetch(`https://ecom-app-u73g.onrender.com/category/update-category/${selected._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: auth.token,
      },
      body: JSON.stringify(data),
    }).then((res1) => {
      res1.json().then((res2) => {
        console.log(res2);
        setSelected(null);
        setUpdatedName("");
        setShow(false);
        getAllCategories();
      });
    });
  }

  function handleDelete(id){
    fetch(`https://ecom-app-u73g.onrender.com/category/delete-category/${id}`, {
      method: "delete",
      headers: {
        authorization: auth.token,
      },
    }).then((res1) => {
      res1.json().then((res2) => {
        console.log(res2);
        getAllCategories();
      });
    });
  }

  return (
    <div>
      <Container>
        <Row>
          <Col md={3}>
            <AdminMenu />
          </Col>
          <Col md={9}>
            <h2 className="text-center my-4">Create Category</h2>
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
            <table className="table my-4">
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c, i) => {
                  return (
                    <tr key={i}>
                      <td>{c.name}</td>
                      <td>
                        <Button variant="primary" onClick={() => {
                          handleShow();
                          setUpdatedName(c.name);
                          setSelected(c);
                        }}>
                          Edit
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Update Category</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <CategoryForm
                              handleSubmit={handleUpdate}
                              value={updatedName}
                              setValue={setUpdatedName}
                            />
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                          </Modal.Footer>
                        </Modal>
                        <Button variant="danger" className="ms-4" onClick={()=>handleDelete(c._id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CreateCategory;
