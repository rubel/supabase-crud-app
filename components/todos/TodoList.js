"use client";
import supabase from "@/misc/supabase";
import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";

const TodosContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
    flex-wrap: wrap;
`

function TodoList() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const loadTodos = async () => {
      const todos_res = await supabase.from("todos").select();
      console.log(todos_res);
      setTodos(todos_res?.data);
      console.log(todos_res);
    };
    loadTodos();
  }, []);
  return (
    <TodosContainer>
      {todos.map((todo, i) => (
        <TodoCard
          key={i}
          description={todo.details}
          progress={todo.progrss}
          title={todo.title}
        />
      ))}
    </TodosContainer>
  );
}

export default TodoList;
