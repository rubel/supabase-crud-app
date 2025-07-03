"use client";
import supabase from "@/misc/supabase";
import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";

function TodoList() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const loadTodos = async () => {
      const todos_res = await supabase.from("todos").select();
      setTodos(todos_res?.data);
      console.log(todos_res);
    };
    loadTodos();
  }, []);
  return (
    <div style={{display:'flex',gap:'10px'}}>
      {todos.map((todo, i) => (
        <TodoCard
          key={i}
          description={todo.details}
          progress={todo.progrss}
          title={todo.title}
        />
      ))}
    </div>
  );
}

export default TodoList;
