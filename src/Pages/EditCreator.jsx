import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import {
  Container,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';

function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

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
    return (
      <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Edit Creator
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mt={2}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="URL"
            name="url"
            value={formData.url}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box mt={2}>
          <TextareaAutosize
            name="description"
            value={formData.description}
            onChange={handleChange}
            rowsMin={4}
            placeholder="Description"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Image URL (Optional)"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Button variant="contained" color="primary" type="submit" mt={2}>
          Update Creator
        </Button>
      </form>
    </Container>
  );
}

export default EditCreator;
