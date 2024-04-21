import React, { useState } from "react";
import { TextField, Button, makeStyles, Card, Modal, Box } from "@mui/material";
import { Create } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../State/Customers/Fest/fest.action";
import { createSkillCategory } from "../../State/Admin/Skills/Action";

const CreateSkillCategoryForm = ({ handleClose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth, fest } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [formData, setFormData] = useState({
    name: "",
  });

  const handleFormSubmit = (freeworkshop) => {
    freeworkshop.prfreeworkshopDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
    });
    const data = {
      name: formData.name,
      festId: fest.usersFest.id,
    };
    dispatch(createSkillCategory({ data, jwt: auth.jwt || jwt }));
    handleClose();
  };

  const handleInputChange = (freeworkshop) => {
    const { name, value } = freeworkshop.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className=" ">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Skill Category
        </h1>
        <form className="space-y-5" onSubmit={handleFormSubmit}>
          <TextField
            label="Category Name"
            name="name"
            value={formData.name}
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

export default CreateSkillCategoryForm;
