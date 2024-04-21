

import React, { useState } from 'react';
import { TextField, Button, makeStyles, Card, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Create } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../State/Customers/Fest/fest.action';
import { createSkill } from '../../State/Admin/Skills/Action';



const CreateSkillForm = ({handleClose}) => {
    const {id}=useParams();
    const dispatch=useDispatch();
    const {auth,fest,skills}=useSelector(store=>store)
    const jwt = localStorage.getItem("jwt")

 
  const [formData, setFormData] = useState({
    name: '',
    skillCategoryId:''
  });

  const handleFormSubmit = (freeworkshop) => {
    freeworkshop.prfreeworkshopDefault();
    console.log('Form submitted:', formData);

    setFormData({
      name: '',
      skillCategoryId:''
    })
    handleClose()
    const data={...formData,festId:fest.usersFest.id}
    dispatch(createSkill({jwt:auth.jwt || jwt,data}))
    
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
          <h1 className='text-gray-400 text-center text-xl pb-10'>Create Skill</h1>
        <form className="space-y-5" onSubmit={handleFormSubmit}>
      <TextField
        label="Skill"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.skillCategoryId}
          label="Category"
          name='skillCategoryId'
          onChange={handleInputChange}
        >
          
          {skills.category.map((item)=> <MenuItem value={item.id}>{item.name}</MenuItem>)}
        </Select>
      </FormControl>
     
      <Button type="submit" variant="contained" color="primary">
        Create
      </Button>
    </form>
    </div>
    </div>
  );
};

export default CreateSkillForm;
