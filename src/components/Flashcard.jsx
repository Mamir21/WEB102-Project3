import React from 'react';
import { CardContent, Typography, Box } from '@mui/material';

export const Flashcard = ({ question, answer, isFlipped, handleFlip }) => {
  return (
    <Box
      onClick={handleFlip}
      sx={{
        width: '100%',
        height: '250px',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        cursor: 'pointer',
      }}
    >
      {/* Front of the card */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          backgroundColor: 'white',
          border: '2px solid #ccc',
        }}
      >
        <CardContent>
          <Typography variant="h6">{question}</Typography>
        </CardContent>
      </Box>

      {/* Back of the card */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          backgroundColor: 'white',
          border: '2px solid #ccc',
        }}
      >
        <CardContent>
          <Typography variant="h6">{answer}</Typography>
        </CardContent>
      </Box>
    </Box>
  );
};
