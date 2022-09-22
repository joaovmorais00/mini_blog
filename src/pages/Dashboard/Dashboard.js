import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useAuthValue } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthValue();
  const uid = user.uid;
  const posts = [];
  return (
    <Grid container direction="column" alignItems="center" rowSpacing={3}>
      <Grid item>
        <Typography variant="h3">Dashboard</Typography>
      </Grid>
      <Grid item>
        <Typography>Gerencie os seus posts</Typography>
      </Grid>
      {posts && posts.length === 0 ? (
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          rowSpacing={1}
        >
          <Grid item sx={{ marginTop: "10px" }}>
            <Typography sx={{ fontWeight: "bold" }}>
              Não foram encontrados posts...
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ borderRadius: 0 }}
              onClick={() => navigate("/posts/create")}
            >
              Crie posts
            </Button>
          </Grid>
        </Grid>
      ) : (
        <>tem post</>
      )}
    </Grid>
  );
};

export default Dashboard;
