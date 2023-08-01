import  { useState, useEffect } from 'react';
import { useParams, Link, useHistory  } from 'react-router-dom';
import { supabase } from '../client'; // Import the Supabase client

function ViewCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    // Fetch the content creator by ID when the component mounts
    async function fetchCreator() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setCreator(data);
      }
    }

    fetchCreator();
  }, [id]);

  if (!creator) {
    return <div>Loading...</div>;
  }

  const history = useHistory();

  async function handleDelete() {
    const { data, error } = await supabase.from('creators').delete().eq('id', id);

    if (error) {
      console.error('Error deleting creator:', error);
    } else {
      console.log('Creator deleted:', data);
      history.push('/');
    }
  }

  return (
    <div>
      <h1>{creator.name}</h1>
      <p>{creator.description}</p>
      <Link to={`/edit/${id}`}>Edit Creator</Link>
      <button onClick={handleDelete}>Delete Creator</button>
    </div>
  );
}

export default ViewCreator;
