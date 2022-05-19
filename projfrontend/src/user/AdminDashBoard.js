import React from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';


const AdminDashboard = () => {

    const {user: {name, email, role}} = isAuthenticated();

    const adminLeftSide = () => {
        return (
            <div className='card'>
                <h4 className='card-header bg-dark text-white'>Admin Navigation</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <Link to="/admin/create/category" className='nav-link text-success'>Create Categories</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to="/admin/categories" className='nav-link text-success'>Manage Categories</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to="/admin/create/product" className='nav-link text-success'>Create Product</Link>
                    </li>
                    
                    <li className='list-group-item'>
                        <Link to="/admin/products" className='nav-link text-success'>Manage Products</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to="/admin/orders" className='nav-link text-success'>Manage Orders</Link>
                    </li>
                </ul>
            </div>
        )
    }
    const adminRightSide = () => {
        return (

            <div className="card bg-success">
                <div className="card-header">Admin Information</div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item-success list-group-item">
                        <span class="badge badge-success text-dark">Name:</span> {name}
                    </li>
                    <li className="list-group-item-success list-group-item">
                        <span class="badge badge-success text-dark">Email:</span> {email}
                    </li>
                    <li className="badge badge-danger">Admin Area</li>
                </ul>
            </div>
        )
    }

  return (
    <Base title="Welcome to admin here" description='manage all of your products here'>
        <div className='row'>
            <div className='col-3'>{adminLeftSide()}</div>
            <div className='col-9'>{adminRightSide()}</div>
        </div>
    </Base>
  )
}

export default AdminDashboard;