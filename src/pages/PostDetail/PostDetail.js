import { Button, Grid, Typography } from "@mui/material";
import React from "react";

import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const PostDetail = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  return (
    <>
      {post && (
        <Grid container direction="column" alignItems="center" rowSpacing={5}>
          <Grid item>
            <Typography variant="h3">{post.title}</Typography>
          </Grid>
          <Grid item>
            <img
              style={{
                width: "800px",
                maxHeight: "auto",
                objectFit: "cover",
                objectPosition: "50% 50%",
              }}
              src={post.imageUrl}
            />
          </Grid>
          <Grid item>
            <Typography>{post.content}</Typography>
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            rowSpacing={2}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Este post trata sobre:
            </Typography>

            {post.tagsArray.map((tag, index) => (
              <Typography key={index}>
                <span style={{ fontWeight: "bold" }}>#</span> {tag}
              </Typography>
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PostDetail;
