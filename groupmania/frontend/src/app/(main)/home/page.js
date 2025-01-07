import CreatePost from "@/components/CreatePost/CreatePost";
import PostStream from "@/components/PostStream/PostStream";

function HomePage() {
  return (
    <div className="homePage_content">
      <CreatePost />
      <PostStream />
    </div>
  );
}

export default HomePage;
