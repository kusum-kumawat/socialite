import { useRef } from "react";

function Post({ post }) {
  const videoRef = useRef(null);

  const handleMouseOver = () => {
    videoRef.current.play();
  };

  const handleMouseOut = () => {
    videoRef.current.pause();
  };

  return (
    <>
      {post.type == "video" && (
        <div className=" hover:opacity-75 transition duration-300 ease-in-out">
          <video
            // controls
            ref={videoRef}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            muted
            src={post.media_url}
            className="cursor-pointer h-full w-full object-cover"
          ></video>
        </div>
      )}
      {post.type == "image" && (
        <div className="cursor-pointer hover:opacity-80 transition duration-300 ease-in-out">
          <img
            src={post.media_url}
            alt="post"
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </>
  );
}
export default Post;
