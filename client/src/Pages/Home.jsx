import React, { useEffect, useState } from "react";
import Form from "../Components/Form";
//import Posts from "../Components/Posts";
import axios from "axios";
import { Container } from "@mui/material";
import Posts from "../Components/Posts.jsx";
export default function Home() {
  const [posts, setPost] = useState([]);
  
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const [currentId, setCurrentId] = useState(0);
  const getAllPosts = async () => {
    const response = await axios.get("http://localhost:5000/posts/getall");
    const data = response.data;
    setPost(data);
    
  };

  useEffect(() => {
    getAllPosts();
  }, [currentId]);

  return (
    <>
    <Container  sx={{ my: "2rem" }} >
    <Form
        posts={posts}
        postData={postData}
        setPostData={setPostData}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
      
      
      <Posts
        posts={posts}
        setCurrentId={setCurrentId}
      />
       

    </Container>
      
    </>
  );
}
