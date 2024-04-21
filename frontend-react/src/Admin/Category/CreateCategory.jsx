import React, { useState } from 'react';
import { TextField, Button, makeStyles, Card } from '@mui/material';
import { Create } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../State/Customers/Fest/fest.action';



const CreateCategory = ({handleClose}) => {
    const {id}=useParams();
    const dispatch=useDispatch();
    const {auth,fest}=useSelector(store=>store)
    const jwt = localStorage.getItem("jwt")
 
  const [formData, setFormData] = useState({
    categoryName: '',
    festId: '',
  });

  const handleFormSubmit = (freeworkshop) => {
    freeworkshop.prfreeworkshopDefault();
    const data={
        name:formData.categoryName,
        fest:{
            id
        }
    }
    dispatch(createCategoryAction({reqData:data, jwt: auth.jwt || jwt}))
    setFormData({
      categoryName: '',
      festId: '',
    })
    handleClose()
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (freeworkshop) => {
    const { name, value } = freeworkshop.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className=' '>
        <div className='p-5'>
          <h1 className='text-gray-400 text-center text-xl pb-10'>Create Category</h1>
        <form className="space-y-5" onSubmit={handleFormSubmit}>
      <TextField
        label="Category Name"
        name="categoryName"
        value={formData.categoryName}
        onChange={handleInputChange}
        fullWidth
      />
     
      <Button type="submit" variant="contained" color="primary">
        Create
      </Button>
    </form>
    </div>
    </div>
  );
};

export default CreateCategory;
