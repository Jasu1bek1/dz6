import React, { useEffect, useState } from 'react';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
   
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setFilteredPosts(data); 
      });
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.body.toLowerCase().includes(query) 
    );
    setFilteredPosts(filtered);
  };

  return (
    <div>
      <h1>Post List</h1>
      <input
        type="text"
        placeholder="Search by title or body"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Find</button>
      <ul>
        {filteredPosts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
