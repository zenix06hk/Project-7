import CreatePost from "@/components/CreatePost/CreatePost";
import PostStream from "@/components/PostStream/PostStream";

function HomePage() {
  return (
    <div>
      <CreatePost />
      <PostStream />
    </div>
  );
}

export default HomePage;
