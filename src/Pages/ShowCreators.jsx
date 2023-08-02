import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client'; 

function ShowCreators() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    // Fetch all content creators from the database when the component mounts
    async function fetchCreators() {
      const { data, error } = await supabase.from('creators').select('*');
      if (error) {
        console.error('Error fetching creators:', error);
      } else {
        setCreators(data);
      }
    }

    fetchCreators();
  }, []);

  return (
    <div>
      <h1>Content Creators</h1>
      <Link to="/add">Add New Creator</Link>
      {creators.map((creator) => (
        <div key={creator.id}>
          <h2>
            <Link to={`/creators/${creator.id}`}>{creator.name}</Link>
          </h2>
          <p>{creator.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ShowCreators;
