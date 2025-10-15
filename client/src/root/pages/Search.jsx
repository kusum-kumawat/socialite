import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        if (searchQuery === "") {
          setSearchResults(null);
          return;
        }
        const response = await axios.get("/api/v1/users/search", {
          params: { username: searchQuery },
        });
        setSearchResults(response.data.data);
      } catch (error) {
        console.error(error);
        // Handle error appropriately
      }
    };
    handleSearch();
  }, [searchQuery]);

  const defaultIcon =
    "https://imgs.search.brave.com/P5TdH03B16VO_nZhsULMf_Vd_JsKPGa7e8rhSxoE89s/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg0LzY3LzE5/LzM2MF9GXzg0Njcx/OTM5X2p4eW1vWVpP/OE9lYWNjM0pSQkRF/OGJTWEJXajBaZkE5/LmpwZw";

  // ... (JSX to render search bar and results)
  // const { username, avatar, creactedAt } = searchResults;
  return (
    <div className="flex flex-col m-3 text-white ">
      <h1 className="text-lg">Search</h1>
      <div className="w-full md:w-1/3 my-3">
        <input
          className="flex h-10 w-60 rounded-md border border-grey/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="email"
          placeholder="Search...."
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </div>
      <section className="h-screen overflow-y-scroll scroll-m-1">
        {searchResults ? (
          searchResults.map((user) => {
            return (
              <Link
                key={user._id}
                to={`/profile/${user._id}`}
                className="mt-2 flex"
              >
                <img
                  src={user.avatar || defaultIcon}
                  alt="user icon"
                  className="w-12 h-12 rounded-full mb-4 object-cover border"
                />
                <section className="mx-4">
                  <h3>{user.username}</h3>
                  <p className="text-sm text-gray-400">{user.fullname}</p>
                </section>
              </Link>
            );
          })
        ) : (
          <p className="text-gray-500">search results appear here</p>
        )}
      </section>
    </div>
  );
}
export default Search;
