"use client";
import supabase from "@/misc/supabase";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import JokeCard from "./JokeCard";

const JokesContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
    
    @media(max-width: 1200px){
        grid-template-columns: 1fr 1fr 1fr;
    }
`

function JokeList() {
  const [jokes, setJokes] = useState([]);
  useEffect(() => {
    const loadJokes = async () => {
      const jokes_res = await supabase.from("jokes").select();
      console.log(jokes_res)
      setJokes(jokes_res?.data);
    };
    loadJokes();
  }, []);
  return (
    <JokesContainer>
      {jokes.map((joke, i) => (
        <JokeCard
          key={i}
          description={joke.joke}
          dislikes={joke.dislikes}
          likes={joke.likes}
          title={joke.title}
          lang={joke.lang}
        />
      ))}
    </JokesContainer>
  );
}

export default JokeList;
