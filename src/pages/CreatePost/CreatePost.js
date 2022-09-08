import React from "react";
import { Button, Grid, TextField, Typography, Box } from "@mui/material";

import { useState } from "react";

import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument();

  const handleSubmit = (event) => {
    event.preventDefault();

    setFormError("");

    insertDocument({
      title,
      imageUrl,
      content,
      tags,
      uid: user.id,
      createdBy: user.name,
    });
  };

  return (
    <div>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h3">Criar Post</Typography>
        </Grid>
        <Grid item>
          <Typography>
            Escreva sobre o que quiser e compartilhe seu conhecimento!
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          spacing={{ xs: 3 }}
        >
          <Grid item>
            <form style={{ width: "400px" }} onSubmit={handleSubmit}>
              <Grid
                container
                direction="column"
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <Grid item sx={{ width: "100%", padding: "0.4rem 0" }}>
                  <TextField
                    sx={{ width: "100%" }}
                    label="Título:"
                    placeholder="Pense num bom título"
                    variant="standard"
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </Grid>
                <Grid item sx={{ width: "100%", padding: "0.4rem 0" }}>
                  <TextField
                    sx={{ width: "100%" }}
                    label="URL da imagem:"
                    placeholder="Insira a imagem do seu post"
                    variant="standard"
                    required
                    value={imageUrl}
                    onChange={(event) => setImageUrl(event.target.value)}
                  />
                </Grid>
                <Grid item sx={{ width: "100%", padding: "0.4rem 0" }}>
                  <TextField
                    sx={{ width: "100%" }}
                    label="Conteúdo:"
                    variant="standard"
                    placeholder="Insira o conteúdo do seu post"
                    multiline
                    maxRows={4}
                    required
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                  />
                </Grid>
                <Grid item sx={{ width: "100%", padding: "0.4rem 0" }}>
                  <TextField
                    sx={{ width: "100%" }}
                    label="Tags:"
                    placeholder="Insira as tags do seu post separadas por vírgula"
                    variant="standard"
                    required
                    value={tags}
                    onChange={(event) => setTags(event.target.value)}
                  />
                </Grid>
                <Grid item sx={{ padding: "0.4rem 0" }}>
                  <Button
                    disabled={response.loading}
                    variant="contained"
                    type="submit"
                  >
                    {!response.loading ? "Criar" : "Aguarde"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          {response.error && (
            <Grid item>
              <Box
                sx={{
                  textAlign: "center",
                  marginTop: "1rem",
                  backgroundColor: "rgba(255, 0,0, 0.3)",
                  color: "black",
                  borderRadius: "1rem",
                  padding: "3rem",
                }}
              >
                <Typography variant="h6">{response.error}</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default CreatePost;
