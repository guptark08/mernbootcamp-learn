import React ,{useState, useEffect}from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import { getCategories, getProduct } from './helper/adminapicall';

const UpdateProduct = ({match}) => {
    const {user, token} = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getRedirect: false,
        formData: ""
    });
    const {name, description, price, stock, categories, category, loading, error, createdProduct, getRedirect, formData} = values;

    const preload = (productId) => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, 
                    name: data.name, 
                    description: data.description, 
                    price: data.price, 
                    category: data.category._id, 
                    stock: data.stock, 
                    formData: new FormData(), 
                    })
                preloadCategories()
            }
        })
    }

    const preloadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({
                    categories: data, 
                    formData: new FormData()
                })                
            }
        })
    }
    useEffect(() => {
        preload(match.params.productId);
    }, [])
    
    

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: "", loading: true});

        UpdateProduct(match.params.productId, user._id, token, formData).then(data => {
            if (data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    price: "",
                    stock: "",
                    loading: false,
                    createdProduct: data.name
                })
            }
        })
    }
    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value})
    }

    const successmsg = () => (
        <div className='alert alert-success mt-3' style={{display: createdProduct ? "" : "none" }}>
            <h4>{createdProduct} updated successfully!</h4>
        </div>
    )
    const errormsg = () => (
        <div className='alert alert-success mt-3' style={{display: error ? "" : "none" }}>
            <h4>{createdProduct} failed to create!</h4>
        </div>
    )
    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group mt-2">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group mt-2">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group mt-2">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group mt-2">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group mt-2">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {
                  categories && 
                  categories.map((cate, index) => (
                      <option key={index} value={cate._id}>{cate.name}</option>
                  ))
              }
            </select>
          </div>
          <div className="form-group mt-2">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="stock"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mt-2">
            Create Product
          </button>
        </form>
      );

  return (
    <Base title='Add Product here' description='Adding product here' className='container bg-info p-4'>
        <Link className='btn btn-dark mb-3 btn-md' to="/admin/dashboard">Admin Home </Link>
        <div className='row bg-dark text-white rounded'>
            <div className='col-md-8 offset-md-2'>
                {successmsg()}
                {errormsg()}
                {createProductForm()}
            </div>
        </div>
    </Base>
  )
}

export default UpdateProduct;