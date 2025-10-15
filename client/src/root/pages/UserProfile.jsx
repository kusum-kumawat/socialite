import axios from "axios";
import { useLoaderData } from "react-router-dom";
import Post from "../../components/post";
import { useEffect, useState } from "react";

export async function loader({ params }) {
  try {
    const response = await axios.get(`/api/v1/users/profile/${params.userId}`);
    const res = await axios.get(`/api/v1/users/isFollowing/${params.userId}`);
    const data = { ...response.data.data, isFollowing: res.data.following };

    return data;
  } catch (error) {
    console.error("Error: ", error);
  }
  return null;
}

function UserProfile() {
  const {
    fullname,
    username,
    avatar,
    userPost,
    _id,
    followers,
    following,
    isFollowing,
  } = useLoaderData();
 
  const defaultProfileImage =
    "https://imgs.search.brave.com/P5TdH03B16VO_nZhsULMf_Vd_JsKPGa7e8rhSxoE89s/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg0LzY3LzE5/LzM2MF9GXzg0Njcx/OTM5X2p4eW1vWVpP/OE9lYWNjM0pSQkRF/OGJTWEJXajBaZkE5/LmpwZw";

  const handleFollow = async () => {
    try {
      const res = await axios.post(`/api/v1/users/follow/${_id}`); // Update button state based on response
      console.log(res.data.following)
      setFollowing(res.data.following);
      // Optionally, update user data or UI based on response data
    } catch (error) {
      console.error(error);
      // Handle errors appropriately
    }
  };

  return (
    <div className="mx-20 p-14 flex flex-col w-full">
      <header className="flex justify-start mb-5">
        <div className="py-5 pl-20 p-14">
          <img
            src={`${avatar || defaultProfileImage}`}
            alt="img"
            className="h-36 w-36 rounded-full object-cover "
          />
        </div>
        <div className="">
          <h2 className="text-2xl">{username}</h2>
          <ul className="flex flex-row pt-3 text-large">
            <li className="mr-10">
              <span className="mx-1">0</span>Posts
            </li>
            <li className="mr-10 ">
              <span className="mx-1">{followers.length}</span>Follower
            </li>
            <li>
              <span className="mx-1">{following.length}</span>Following
            </li>
          </ul>
          <h3 className="text-large py-2">{fullname}</h3>
          <button
            onClick={handleFollow}
            className="px-12 py-2 m-2 bg-indigo-400 rounded-lg"
          >
            {!isFollowing ? "Follow" : "following"}
          </button>
        </div>
      </header>
      <section className="pt-5 border-t grid-h-50 border-primary grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
        {userPost &&
          userPost.map((post) => {
            return <Post key={post._id} post={post}></Post>;
          })}
      </section>
    </div>
  );
}
export default UserProfile;
