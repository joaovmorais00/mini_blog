import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import Post from "../../components/Post/Post";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

import { useNavigate } from "react-router-dom";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const navigate = useNavigate();

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <Grid direction="column" alignItems="center" container rowSpacing={8}>
      <Grid item>
        <Typography variant="h3">Busca</Typography>
      </Grid>
      {posts && posts.length === 0 && (
        <>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            rowSpacing={4}
          >
            <Grid item>
              <Typography>
                Não foram encontrados posts a partir da sua busca...
              </Typography>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                sx={{ borderRadius: 0 }}
                onClick={() => navigate("/")}
              >
                Voltar
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      {posts && posts.map((post) => <Post post={post} key={post.id} />)}
    </Grid>
  );
};

export default Search;
