import "./Home.css"
import travel_blogs from "../../assets/posts";
import Blog from "../Bolg/Blog";
export default function Home() {
  const blog_components = travel_blogs.map((blog) => <Blog key = {blog.id} {...blog} />);
  return (
    <div>
      {blog_components}
    </div>
  )
}
