import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from  '../client'; 

function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  });

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
        setFormData(data);
      }
    }

    fetchCreator();
  }, [id]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { data, error } = await supabase
      .from('creators')
      .update(formData)
      .eq('id', id);

    if (error) {
      console.error('Error updating creator:', error);
    } else {
      console.log('Creator updated:', data);
      navigate(`/creators/${id}`);
    }
  }

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Creator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>URL:</label>
          <input type="text" name="url" value={formData.url} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label>Image URL (Optional):</label>
          <input type="text" name="imageURL" value={formData.imageURL} onChange={handleChange} />
        </div>
        <button type="submit">Update Creator</button>
      </form>
    </div>
  );
}

export default EditCreator;
