import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/v1/users/posts");
        setposts(res.data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const removeHashtags = (caption) => {
    // Regular expression to match hashtags
    const hashtagRegex = /#[\w\d_-]+/g;

    // Replace hashtags with empty strings
    return caption.replace(hashtagRegex, "");
  };
  const defaultProfileImage =
    "https://imgs.search.brave.com/P5TdH03B16VO_nZhsULMf_Vd_JsKPGa7e8rhSxoE89s/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg0LzY3LzE5/LzM2MF9GXzg0Njcx/OTM5X2p4eW1vWVpP/OE9lYWNjM0pSQkRF/OGJTWEJXajBaZkE5/LmpwZw";

  return (
    <>
      <div className="flex flex-col w-3/4 items-center grid-cols-1">
        {posts &&
          posts.map((post) => {
            return (
              <div className="border-b border-primary mt-5">
                <Link
                  to={`/profile/${post.user_id._id}`}
                  className="flex flex-row items-center  mb-2"
                >
                  {console.log(post)}
                  {post.user_id.avatar ? (
                    <img
                      src={post.user_id.avatar}
                      className="rounded-full h-10 w-10 object-cover"
                    />
                  ) : (
                    <img
                      src={defaultProfileImage}
                      alt=""
                      className="rounded-full h-full"
                    />
                  )}
                  <h2 className="ml-2">{post.user_id.username}</h2>
                </Link>

                <div className=" w-98 h-98 border border-primary">
                  {post.type == "image" && (
                    <img
                      src={post.media_url}
                      alt="post"
                      className="h-96 object-cover m-auto"
                    />
                  )}
                  {post.type == "video" && (
                    <div className="border-gray-300">
                      <video
                        controls
                        autoPlay
                        muted
                        loop
                        src={post.media_url}
                        className="h-96 object-cover m-auto"
                      ></video>
                    </div>
                  )}
                </div>
                <div className="flex flex-row text-2xl">
                  <div className="m-2">
                    <FaRegHeart />
                  </div>
                  <div className="m-2">
                    <FaRegComment />
                  </div>
                </div>
                {/* <p>{post.createdAt}</p> */}
                <p>{removeHashtags(post.caption)}</p>
                <p className="text-indigo-400">
                  {post.hashtags.map((hashtag) => hashtag)}
                </p>
                <textarea
                  name="comment"
                  id="comment"
                  cols="30"
                  rows="1"
                  className="bg-transparent w-full m-2"
                  placeholder="Add a comment..."
                ></textarea>
              </div>
            );
          })}
      </div>
      <div className="w-1/4">suggestion</div>
    </>
  );
}
export default Home;
