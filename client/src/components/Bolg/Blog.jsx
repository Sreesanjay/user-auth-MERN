import "./Blog.css"
export default function Blog(blog) {
     return (
        <div  className="blog-container">
          <div className="card-container">
               <img src={blog.image_url} className="travel-img" alt="" />
               <section className="details-container">
                    <div className="location-container">
                         <img
                              src="/location.png"
                              className="location-img"
                              alt=""
                         />
                         <small>{blog.location}</small>
                         <a href={blog.google_map}>View On Google Map</a>
                    </div>
                    <h2 className="blog-title">{blog.title}</h2>
                    <p className="travel-date">
                         {blog.start_date} - {blog.end_date}
                    </p>
                    <p className="description">{blog.description}</p>
               </section>
          </div>
          </div>
     );
}
