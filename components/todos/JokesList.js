"use client";
import supabase from "@/misc/supabase";
import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import JokeCard from "./JokeCard";

const JokesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledDialog = styled.dialog`
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  margin: 0;
  inset: 0; /* ensure full-screen overlay */
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  &::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }

  z-index: 1000;
`;


const FlipWrapper = styled.div`
  perspective: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnimatedCard = styled.div`
  transform-style: preserve-3d;
  animation: flipIn 0.6s ease forwards;

  &.exit {
    animation: flipOut 0.6s ease forwards;
  }

  @keyframes flipIn {
    from {
      opacity: 0;
      transform: rotateY(90deg) scale(0.6);
    }
    to {
      opacity: 1;
      transform: rotateY(0deg) scale(1);
    }
  }

  @keyframes flipOut {
    from {
      opacity: 1;
      transform: rotateY(0deg) scale(1);
    }
    to {
      opacity: 0;
      transform: rotateY(90deg) scale(0.6);
    }
  }
`;

function JokeList() {
  const [jokes, setJokes] = useState([]);
  const [selectedJoke, setSelectedJoke] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    const loadJokes = async () => {
      const jokes_res = await supabase.from("jokes").select();
      setJokes(jokes_res?.data || []);
    };
    loadJokes();
  }, []);

  useEffect(() => {
    if (selectedJoke && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [selectedJoke]);

  // Backdrop click to close
  const handleDialogClick = (e) => {
    if (e.target === dialogRef.current) {
      closeModal();
    }
  };

  const jokeSelected = (joke) => {
    setSelectedJoke(joke);
    setIsExiting(false);
  };

  const closeModal = () => {
    setIsExiting(true);
    setTimeout(() => {
      dialogRef.current?.close();
      setSelectedJoke(null);
      setIsExiting(false);
    }, 600); // duration of exit animation
  };

  return (
    <>
      <JokesContainer>
        {jokes.map((joke, i) => (
          <JokeCard key={i} joke={joke} jokeSelected={() => jokeSelected(joke)} />
        ))}
      </JokesContainer>

      {selectedJoke && (
        <StyledDialog ref={dialogRef} onClick={handleDialogClick}>
          <FlipWrapper>
            <AnimatedCard className={isExiting ? "exit" : ""}>
              <JokeCard joke={selectedJoke} />
            </AnimatedCard>
          </FlipWrapper>
        </StyledDialog>
      )}
    </>
  );
}

export default JokeList;
