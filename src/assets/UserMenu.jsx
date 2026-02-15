import React from 'react'
import { NavLink } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';

function UserMenu() {
  return (
    <div>
      <ListGroup className='mt-5'>
        <NavLink to="/Dashboard/user/orders"
        className="list-group-item">Orders</NavLink>
      </ListGroup>
    </div>
  )
}

export default UserMenu
