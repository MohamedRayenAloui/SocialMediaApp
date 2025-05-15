import { React, useState } from "react";
import { likePost, deletePost } from "../api";
import moment from "moment";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAuth } from "../auth";

export default function Post({ post, setCurrentId}) {
  const { authTokens } = useAuth();
  const [likes, setLikes] = useState(post?.likes);
  //const user = JSON.parse(authTokens)?.oldUser ;
  const getUser = () =>{
    if(authTokens){
      return JSON.parse(authTokens)?.oldUser
    }
    else return null
  }
  const user=getUser();
  console.log(user);
  const hasLikedPost = post.likes.find((like) => like === user && user._id);
  const handleLike = async () => {
     likePost(post._id);

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== user && user._id));
    } else {
      setLikes([...post.likes, user && user._id]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === user && user._id) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Grid item key={post._id} xs={12} sm={6} md={4}>
      <Card key={post._id} sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton
              onClick={() => setCurrentId(post._id)}
              aria-label="settings"
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={post.title}
          subheader={moment(post.createdAt).fromNow()}
        />
        <CardMedia
          component="img"
          height="194"
          image={post.selectedFile}
          alt="postImage"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.message}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            size="small"
            color="primary"
            disabled={!authTokens}
            onClick={handleLike}
          >
           <Likes />
           </Button>
           {user && user?._id === post?.creator && (
             <Button
               size="small"
               color="secondary"
               onClick={() => deletePost(post._id)}
             >
               <DeleteIcon fontSize="small" /> &nbsp; Delete
             </Button>
           )}
         </CardActions>
       </Card>
     </Grid>
    )
  }
    