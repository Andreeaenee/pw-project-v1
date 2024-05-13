import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Wrapper from "../components/Wrapper";
import { fetchRecipesData } from "../api/getRecipes";

const RecipesPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
    const [data, setData] = useState([]);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
   fetchRecipesData()
      .then((response) => {
        setData(response)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  console.log(data);
  return (
    <Wrapper>
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
        }}
      >
        <div
          sx={{
            display: "flex",
            marginBottom: 2,
            alignItems: "flex-end",
          }}
        >
          <TextField
            sx={{ marginRight: 2 }}
            label="Search"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleFilterClick}
            sx={{ height: "55px", width: "100px", textTransform: "none"}}
          >
            Filter
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleFilterClose}
          >
            <MenuItem onClick={handleFilterClose}>Category</MenuItem>
            <MenuItem onClick={handleFilterClose}>Ingredient</MenuItem>
            <MenuItem onClick={handleFilterClose}>Author</MenuItem>
          </Menu>
        </div>
        <div
          sx={{
            width: "100%",
            maxWidth: 600,
            marginTop: 2,
          }}
        >
          {data.map((recipe) => (
            <Card key={recipe.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {recipe.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  {recipe.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default RecipesPage;
