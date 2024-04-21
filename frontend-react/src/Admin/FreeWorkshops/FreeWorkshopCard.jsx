import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteFreeWorkshopAction } from "../../State/Customers/Fest/fest.action";

const FreeWorkshopCard = ({ item,isCustomer }) => {
  const dispatch=useDispatch();
  const handleDeleteFreeWorkshop = () => {
    dispatch(deleteFreeWorkshopAction(item.id))
  };
  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{ height: 345,
            '&:hover': {
              transform: 'scale(1.1)', // Example: Scale the image on hover
              transition: 'transform 0.5s ease-in-out', // Example: Apply a smooth transition effect
            },
           }}
          image={item.image}
          title="green iguana"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.fest.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.name}
          </Typography>
          <div className="py-2 space-y-2">
            <p>{item.location}</p>
            <p className="text-sm text-blue-500">{item.startedAt}</p>
            <p className="text-sm text-red-500">{item.endsAt}</p>
          </div>
        </CardContent>
    {!isCustomer &&    <CardActions>
          <IconButton onClick={handleDeleteFreeWorkshop} aria-label="add to favorites">
            <DeleteIcon />
          </IconButton>
        </CardActions>}
      </Card>
    </div>
  );
};

export default FreeWorkshopCard;
