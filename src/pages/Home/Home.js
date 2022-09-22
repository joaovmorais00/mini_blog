import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../../components/Post/Post";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

import "./Home.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading, error } = useFetchDocuments("posts");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    if (query) {
      let lowerCase = query.toLowerCase();
      setQuery(query.toLowerCase());
      console.log(query, "query");
      return navigate(`search?q=${lowerCase}`);
    }
  };

  useEffect(() => {
    // console.log(posts);
  }, [posts]);

  return (
    <Grid direction="column" container alignItems="center" rowSpacing={8}>
      <Grid item>
        <Typography variant="h3">HOME</Typography>
      </Grid>
      <Grid item sx={{ padding: "2rem 0", width: "400px" }}>
        <form onSubmit={handleSearch}>
          <Grid container columnSpacing={5}>
            <Grid item md={9} sx={{ padding: 0 }}>
              <TextField
                sx={{ width: "100%" }}
                label="Pesquisa:"
                placeholder="Pesquise por tags"
                variant="standard"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </Grid>
            <Grid item md={3} textAlign="center">
              <Button
                variant="contained"
                type="submit"
                sx={{ margin: 0, borderRadius: 0, padding: "0.6rem 2rem" }}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>

      {loading && <Typography>Carregando</Typography>}
      {posts &&
        posts.map((post) => (
          // <Post post={post} />;
          <Post key={post.id} post={post} />
        ))}

      {/* {["", ""].map(() => (
        <Post />
      ))} */}

      {error && <Typography>{error}</Typography>}
    </Grid>
  );
};

export default Home;
