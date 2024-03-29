import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import Comment from "@mui/icons-material/Comment";
import PostComments from "./PostComments";
import PostLikes from "./PostLikes";
import { Collapse } from "@mui/material";
import LoggedIn from "./LoggedIn";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

type PostProps = {
  post: PostData;
};
export type PostData = {
  description: string;
  createdAt: { seconds: number; nanoseconds: number };
  fileName: string;
  id: string;
  imageUrl: string;
  title: string;
  user: {
    displayName: string;
    email: string;
    photoUrl: string;
    createdAt: { seconds: number; nanoseconds: number };
    uid: string;
  };
};

const Post = ({ post }: PostProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const copyToClipboardHandler = (imageUrl: string) => {
    navigator.clipboard.writeText(imageUrl);
  };

  return (
    <Card sx={{ maxWidth: "80%", minWidth: "80%", m: 3 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} src={post.user?.photoUrl}></Avatar>
        }
        title={post.title}
        subheader={new Date(post.createdAt.seconds * 1000).toDateString()}
        sx={{ bgcolor: "primary.200" }}
      />
      <CardMedia
        component="img"
        height="194"
        image={post.imageUrl}
        loading="lazy"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <LoggedIn>
          <PostLikes postId={post.id} />
        </LoggedIn>
        <IconButton
          sx={{ ml: 3 }}
          color="primary"
          aria-label="share"
          onClick={() => copyToClipboardHandler(post.imageUrl)}
        >
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          color="primary"
        >
          <Comment />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <PostComments postId={post.id} />
      </Collapse>
    </Card>
  );
};

export default Post;
