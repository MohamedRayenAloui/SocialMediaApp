import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Post from "./Post";
import { createTheme, ThemeProvider } from "@mui/material/styles";



const theme = createTheme();

export default function Posts({posts,setCurrentId}) {
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {posts.map((post) => (
              <Post key={post._id} post={post} setCurrentId={setCurrentId} />
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
