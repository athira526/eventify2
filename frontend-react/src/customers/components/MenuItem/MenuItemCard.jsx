import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../State/Customers/Cart/cart.action";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { categorizedSkills } from "../../util/CategorizeSkills";

const MenuItemCard = ({ item }) => {
  const dispatch = useDispatch();

  

  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleCheckboxChange = (itemName) => {
    if (selectedSkills.includes(itemName)) {
      console.log("yes");
      setSelectedSkills(
        selectedSkills.filter((item) => item !== itemName)
      );
    } else {
      console.log("no");
      setSelectedSkills([...selectedSkills, itemName]);
    }
  };
  
  const handleAddItemToCart = (e) => {
    
    const data = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        menuItemId: item.id,
        quantity: 1,
        skills:selectedSkills
      },
    };
    dispatch(addItemToCart(data));
  };
  

  return (
    <>
      {/* <div className="lg:flex items-center justify-between box">
      <div className="lg:flex items-center lg:space-x-5">
        <img
          className="w-[7rem] h-[7rem] object-cover"
          src={item.imageUrl}
          alt=""
        />

        <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
          <p className="font-semibold text-xl">{item.name}</p>
          <p>₹{item.price}</p>
          <p className="text-gray-400">{item.description}</p>
        </div>
      </div>
      <div>
        <Button onClick={handleAddItemToCart}>Add To Cart</Button>
      </div>

     
    </div> */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="lg:flex items-center justify-between">
            <div className="lg:flex items-center lg:space-x-5">
              <img
                className="w-[7rem] h-[7rem] object-cover"
                src={item.images[0]}
                alt=""
              />

              <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                <p className="font-semibold text-xl">{item.name}</p>
                <p>₹{item.price}</p>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
            {/* <div>
        <Button onClick={handleAddItemToCart}>Add To Cart</Button>
      </div> */}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleAddItemToCart} >
            <div className="flex gap-5 flex-wrap">
               {Object.keys(
                          categorizedSkills(item?.skills)
                        )?.map((category) => (
              <div className="pr-5">
                
                <p>{category}</p>
                <FormGroup >
                  {categorizedSkills(item?.skills)[
                                category
                              ].map((skill, index) => (
                    <FormControlLabel
                      key={skill.name}
                      control={
                        <Checkbox
                          checked={selectedSkills.includes(
                            skill.name
                          )}
                          onChange={() =>
                            handleCheckboxChange(skill.name)
                          }
                          disabled={!skill.inStoke}
                        />
                      }
                      label={skill.name}
                    />
                  ))}
                </FormGroup>
              </div>
            ))}
            </div>
           

            <div className="pt-5">
              <Button variant="contained" disabled={!item.available} type="submit">
                {item.available?"Add To Cart":"Out of stock"}
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default MenuItemCard;
