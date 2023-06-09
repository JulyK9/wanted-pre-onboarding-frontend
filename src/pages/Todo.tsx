import { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import { BASE_URL } from '../api/url';
import { TodoItemType } from '../types/index';
import { useNavigate } from 'react-router-dom';
import AddTodo from '../components/AddTodo';

const Todo = () => {
  const [todoText, setTodoText] = useState<string>('');
  const [todos, setTodos] = useState<TodoItemType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const access_token = localStorage.getItem('accessToken');

    if (!access_token) {
      navigate('/signin');
      return;
    }

    const getTodos = async () => {
      const response = await fetch(`${BASE_URL}/todos`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const todosData = await response.json();

      if (response.ok) {
        setTodos(todosData);
      }

      if (!response.ok) {
        throw new Error(
          todosData.message || '할일 목록을 정상적으로 가져오지 못했습니다.'
        );
      }
    };

    getTodos();
  }, [todoText, navigate]);

  return (
    <>
      <AddTodo todoText={todoText} setTodoText={setTodoText} />
      <hr />
      <TodoList todos={todos} />
    </>
  );
};

export default Todo;
