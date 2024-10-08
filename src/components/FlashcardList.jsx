import React, { useState } from 'react';
import { Flashcard } from './Flashcard';
import { Button, Container, Typography, Box, GlobalStyles, TextField } from '@mui/material';

export const FlashcardList = () => {
  const flashcards = [
    { question: 'What is React?', answer: 'A JavaScript library for building UIs.' },
    { question: 'What is TypeScript?', answer: 'A typed superset of JavaScript.' },
    { question: 'What is JSX?', answer: 'A syntax extension for JavaScript used in React.' },
    // Add more flashcards
  ];

  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [correctStreak, setCorrectStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  // Shuffle the cards
  const handleShuffle = () => {
    flashcards.sort(() => Math.random() - 0.5);
    setCurrentCard(0);
    setIsFlipped(false);
    setFeedback(null);
    setUserGuess('');
  };

  const handleNextCard = () => {
    setCurrentCard((prevCard) => (prevCard + 1) % flashcards.length);
    setIsFlipped(false);
    setFeedback(null);
    setUserGuess('');
  };

  const handlePreviousCard = () => {
    setCurrentCard((prevCard) =>
      prevCard === 0 ? flashcards.length - 1 : prevCard - 1
    );
    setIsFlipped(false);
    setFeedback(null);
    setUserGuess('');
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Handle user answer submission
  const handleSubmitAnswer = () => {
    const correctAnswer = flashcards[currentCard].answer.toLowerCase();
    if (userGuess.toLowerCase() === correctAnswer) {
      setFeedback('Correct!');
      setCorrectStreak(correctStreak + 1);
      setLongestStreak(Math.max(longestStreak, correctStreak + 1));
    } else {
      setFeedback('Incorrect.');
      setCorrectStreak(0); // Reset streak on wrong answer
    }
  };

  return (
    <>
      <GlobalStyles
        styles={{
          html: { height: '100%' },
          body: { height: '100%', margin: 0, padding: 0, overflow: 'hidden' }
        }}
      />
      <Container
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
          Coding Flashcards
        </Typography>

        <Typography variant="h6" sx={{ marginBottom: '10px' }}>
          Test your knowledge of JavaScript and Web Development.
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: '25px', fontStyle: 'italic' }}>
          Current Streak: {correctStreak} | Longest Streak: {longestStreak}
        </Typography>

        <Box
          sx={{
            width: { xs: '70%', sm: '70%', md: '60%', lg: '50%' },
            perspective: '1000px',
            paddingBottom: '40px',
          }}
        >
          <Flashcard
            question={flashcards[currentCard].question}
            answer={flashcards[currentCard].answer}
            isFlipped={isFlipped}
            handleFlip={handleFlip}
          />
        </Box>

        {/* User input and feedback section */}
        <Box sx={{ width: { xs: '70%', sm: '70%', md: '60%', lg: '50%' }, marginBottom: '20px', marginTop: '20px' }}>
          <TextField
            fullWidth
            label="Your Guess"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            sx={{ marginBottom: '10px' }}
          />
          <Button onClick={handleSubmitAnswer} variant="contained" sx={{ marginBottom: '10px' }}>
            Submit Answer
          </Button>
          {feedback && (
            <Typography variant="body2" sx={{ color: feedback === 'Correct!' ? 'green' : 'red' }}>
              {feedback}
            </Typography>
          )}
        </Box>

        <Box sx={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
          <Button
            onClick={handlePreviousCard}
            variant="contained"
            sx={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              '&:hover': {
                backgroundColor: '#0056b3',
              },
            }}
          >
            Previous
          </Button>
          <Button
            onClick={handleNextCard}
            variant="contained"
            sx={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              '&:hover': {
                backgroundColor: '#0056b3',
              },
            }}
          >
            Next
          </Button>
          <Button
            onClick={handleShuffle}
            variant="contained"
            sx={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              '&:hover': {
                backgroundColor: '#218838',
              },
            }}
          >
            Shuffle
          </Button>
        </Box>
      </Container>
    </>
  );
};
