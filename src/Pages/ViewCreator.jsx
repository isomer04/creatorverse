import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { Container, Typography, Button, Box, CircularProgress } from '@mui/material';

function ViewCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const navigate = useNavigate();

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
    return (
      <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </Container>
    );
  }

  async function handleDelete() {
    const { data, error } = await supabase.from('creators').delete().eq('id', id);

    if (error) {
      console.error('Error deleting creator:', error);
    } else {
      console.log('Creator deleted:', data);
      navigate('/');
    }
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {creator.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Description: {creator.description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        URL: {creator.url}
      </Typography>
      <img src={creator.imageURL} alt={creator.name} style={{ maxWidth: '100%', height: 'auto' }} />

      <Box mt={2}>
        <Button component={Link} to={`/edit/${id}`} variant="outlined" color="primary">
          Edit Creator
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleDelete} style={{ marginLeft: '10px' }}>
          Delete Creator
        </Button>
      </Box>
    </Container>
  );
}

export default ViewCreator;
