import { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Box, Container } from "@mui/material";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";
import { PostData } from "./Post";

const HomePage = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [error, setError] = useState<Error>();

  useEffect(
    () =>
      onSnapshot(collection(db, "Posts"), (snapshot) => {
        const postDocuments: PostData[] = [];
        snapshot.forEach((doc) => {
          postDocuments.push({
            ...(doc.data() as PostData),
            id: doc.id,
          });
        });

  if (error) return <Box>{error.message}</Box>;
        setPosts(postDocuments);
      }),
    []
  );

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!posts.length && <PostSkeleton />}
      {posts?.map((post: PostData) => (
        <Post post={post} key={post.id} />
      ))}
    </Container>
  );
};

export default HomePage;
