import { Create } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import CreateSkillCategoryForm from "./CreateSkillCategory";
import { useEffect, useState } from "react";
import CreateSkillForm from "./CreateSkillForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getSkillCategory,
  getSkillsOfFest,
  updateStockOfSkill,
} from "../../State/Admin/Skills/Action";
import { getFestById } from "../../State/Customers/Fest/fest.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const Skills = () => {
  const dispatch = useDispatch();
  const { auth, fest, skills } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [openSkillCategory, setOpenSkillCategory] = useState(false);
  const handleOpenSkillCategory = () => setOpenSkillCategory(true);
  const handleCloseSkillCategory = () => setOpenSkillCategory(false);

  const [openSkill, setOpenSkill] = useState(false);
  const handleOpenSkill = () => setOpenSkill(true);
  const handleCloseSkill = () => setOpenSkill(false);

  const handleUpdateStocke = (id) => {
    dispatch(updateStockOfSkill({ id, jwt }));
  };

  return (
    <div className="px-2">
      <Grid container spacing={1}>
        <Grid  item xs={12} lg={8}>
          <Card className="mt-1">
            <CardHeader
              title={"Skills"}
              sx={{
                pt: 2,
                alignItems: "center",
                "& .MuiCardHeader-action": { mt: 0.6 },
              }}
              action={
                <IconButton onClick={handleOpenSkill}>
                  {" "}
                  <Create />
                </IconButton>
              }
            />
            <TableContainer className="h-[88vh] overflow-y-scroll">
              <Table sx={{}} aria-label="table in dashboard">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>

                    <TableCell>Name</TableCell>

                    <TableCell>Category</TableCell>

                    <TableCell>Availability</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {skills.skills.map((item, index) => (
                    <TableRow
                      className="cursor-pointer"
                      hover
                      key={item.id}
                      sx={{
                        "&:last-of-type td, &:last-of-type th": { bbooking: 0 },
                      }}
                    >
                      <TableCell>{item?.id}</TableCell>

                      <TableCell className="">{item.name}</TableCell>
                      <TableCell className="">{item.category.name}</TableCell>

                      <TableCell className="">
                        <Button
                          onClick={() => handleUpdateStocke(item.id)}
                          color={item.inStoke ? "success" : "primary"}
                        >
                          {item.inStoke ? "in stock" : "out of stock"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card className="mt-1">
            <CardHeader
              title={"Category"}
              sx={{
                pt: 2,
                alignItems: "center",
                "& .MuiCardHeader-action": { mt: 0.6 },
              }}
              action={
                <IconButton onClick={handleOpenSkillCategory}>
                  {" "}
                  <Create />
                </IconButton>
              }
            />
            <TableContainer>
              <Table sx={{}} aria-label="table in dashboard">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>

                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {skills.category?.map((item, index) => (
                    <TableRow
                      className="cursor-pointer"
                      hover
                      key={item.id}
                      sx={{
                        "&:last-of-type td, &:last-of-type th": { bbooking: 0 },
                      }}
                    >
                      <TableCell>{item?.id}</TableCell>

                      <TableCell className="">{item.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      <Modal
        open={openSkill}
        onClose={handleCloseSkill}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateSkillForm handleClose={handleCloseSkill} />
        </Box>
      </Modal>

      <Modal
        open={openSkillCategory}
        onClose={handleCloseSkillCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateSkillCategoryForm
            handleClose={handleCloseSkillCategory}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Skills;
