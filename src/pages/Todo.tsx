import { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import { BASE_URL } from '../api/url';
import { TodoItemType } from '../types/index';
import { useNavigate } from 'react-router-dom';

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

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const reqbody = {
      todo: todoText,
    };

    const access_token = localStorage.getItem('accessToken');

    const response = await fetch(`${BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(reqbody),
    });

    const resData = await response.json();

    if (response.ok) {
      console.log(resData);
      setTodoText('');
    }

    if (!response.ok) {
      throw new Error(
        resData.message || '할일이 정상적으로 추가되지 않았습니다.'
      );
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          data-testid="new-todo-input"
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button type="submit" data-testid="new-todo-add-button">
          추가
        </button>
      </form>
      <hr />
      <TodoList todos={todos} />
    </>
  );
};

export default Todo;
