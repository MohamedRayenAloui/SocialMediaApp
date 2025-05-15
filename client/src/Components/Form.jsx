import React, { useEffect } from "react";
import { TextField, Button, Typography, Paper, Container } from "@mui/material";
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../api";
import { useAuth } from "../auth";
export default function Form({ postData, setPostData,currentId,setCurrentId,posts }) {
  const { authTokens } = useAuth();
  const post = currentId ? posts.find((message) => message._id === currentId) : null; 
  //const user = JSON.parse(authTokens)?.oldUser;
  
  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  useEffect(() => {
    if (post) setPostData(post);
  },[post,setPostData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Data = {
      title: postData.title,
      message: postData.message,
      tags: postData.tags,
      selectedFile: postData.selectedFile,
    };
    if(currentId===0){
    createPost(Data);
    }else{
      updatePost(Data,currentId);
    }
    
    clear();
  };


  return (
    <Container>
      <Paper>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
          <TextField
            sx={{ my: "1rem" }}
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            sx={{ my: "1rem" }}
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
            sx={{ my: "1rem" }}
            name="tags"
            variant="outlined"
            label="Tags (coma separated)"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <div>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Container sx={{ mx: "auto", my: "1rem" }}>
            <Button
            disabled={!authTokens}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
            >
              Submit
            </Button>
            <Button
            disabled={!authTokens}
              sx={{ my: "1rem" }}
              variant="contained"
              color="secondary"
              size="large"
              onClick={clear}
              fullWidth
            >
              Clear
            </Button>
          </Container>
        </form>
      </Paper>
    </Container>
  );
}
