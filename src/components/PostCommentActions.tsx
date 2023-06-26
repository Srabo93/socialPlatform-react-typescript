import { doc, updateDoc, increment, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Button, ButtonGroup, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Comment } from "./PostComments";
import DeleteIcon from "@mui/icons-material/Delete";
import useAppStore from "../store";

const PostCommentActions = ({
  postId,
  comment,
}: {
  postId: string;
  comment: Comment;
}) => {
  const currentUser = useAppStore((state) => state.user);
  const commentRef = doc(db, "Posts", `${postId}`, "Comments", `${comment.id}`);

  const addLikeHandler = async () => {
    await updateDoc(commentRef, {
      likes: increment(1),
    });
  };
  const addDislikeHandler = async () => {
    await updateDoc(commentRef, {
      dislikes: increment(1),
    });
  };
  const deleteCommentHandler = async () => {
    await deleteDoc(commentRef);
  };

  return (
    <ButtonGroup
      sx={{ display: "flex", justifyContent: "flex-end" }}
      variant="text"
      aria-label="like / dislike group"
      size="small"
    >
      <Button onClick={addLikeHandler}>
        <ThumbUpIcon color="secondary" fontSize="small" />
        <Typography sx={{ px: 1 }}>{comment.likes}</Typography>
      </Button>
      <Button sx={{ px: 1 }} onClick={addDislikeHandler}>
        <ThumbDownIcon color="secondary" fontSize="small" />
        <Typography sx={{ px: 1 }}>{comment.dislikes}</Typography>
      </Button>
      {comment.user.uid === currentUser.uid && (
        <Button sx={{ px: 1 }} onClick={deleteCommentHandler}>
          <DeleteIcon color="secondary" fontSize="small" />
        </Button>
      )}
    </ButtonGroup>
  );
};

export default PostCommentActions;
