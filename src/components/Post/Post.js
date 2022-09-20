import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Post = ({ post }) => {
  return (
    <>
      {post && (
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          rowSpacing={3}
        >
          <Grid item>
            <img
              style={{
                width: "600px",
                maxHeight: "500px",
                objectFit: "cover",
                objectPosition: "50% 50%",
              }}
              src={post.imageUrl}
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            rowSpacing={2}
            sx={{ width: "600px" }}
          >
            <Grid item>
              <Typography variant="h4">{post.title}</Typography>
            </Grid>
            <Grid item>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Criado por: </span>
                <span style={{ fontStyle: "italic" }}>{post.createdBy}</span>
              </Typography>
            </Grid>

            <Grid item>
              <Typography align="justify">
                {post.content}
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                vestibulum, nisl nec posuere maximus, tellus nisi posuere quam,
                in pellentesque neque libero nec tellus. Duis nisi enim,
                faucibus non venenatis in, venenatis vitae elit. Donec eros
                turpis, aliquet ut nunc sed, vulputate congue leo. Cras vitae
                risus volutpat, fringilla ex sit amet, placerat turpis. Ut a
                mattis elit. Nulla nisl purus, suscipit ut finibus in, commodo
                sed diam. Proin eu tincidunt eros. Pellentesque erat magna,
                porta vitae ligula efficitur, vulputate tristique nulla.
                Suspendisse varius rhoncus risus sodales efficitur. Nam nec dui
                blandit, porta tortor eget, condimentum elit. Vivamus dapibus
                tellus id mi posuere, aliquet semper felis consectetur. Nunc et
                ligula lacus. Pellentesque consequat nisi magna, aliquet
                bibendum arcu ultrices id. */}
              </Typography>
            </Grid>

            {/* <Grid item>
              {post.tagsArray.map((tag) => {
                <Typography>{tag}</Typography>;
              })}
            </Grid> */}
            <Grid item>
              {post.tagsArray.map((tag, index) => (
                <Typography key={index} sx={{ display: "inline" }}>
                  <span style={{ fontWeight: "bold" }}>#</span>
                  {tag}{" "}
                </Typography>
              ))}
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{ fontWeight: "bold", padding: "0.4rem 2rem" }}
              >
                Ler
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Post;
