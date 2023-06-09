import { useState, useEffect, useCallback, memo } from 'react';
import TodoList from '../components/TodoList';
import { BASE_URL } from '../api/url';
import { TodoItemType } from '../types/index';
import { useNavigate } from 'react-router-dom';
import AddTodo from '../components/AddTodo';

const Todo = () => {
  const [todoText, setTodoText] = useState<string>('');
  const [todos, setTodos] = useState<TodoItemType[]>([]);

  const navigate = useNavigate();

  const getTodos = useCallback(async () => {
    const access_token = localStorage.getItem('accessToken');

    const response = await fetch(`${BASE_URL}/todos`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const todosData = await response.json();

    if (response.ok) {
      setTodos((prevTodos) => todosData);
    }

    if (!response.ok) {
      throw new Error(
        todosData.message || '할일 목록을 정상적으로 가져오지 못했습니다.'
      );
    }
  }, []);

  const handleComplete = useCallback(async (todoItem: TodoItemType) => {
    const updatedTodoItem = {
      ...todoItem,
      isCompleted: !todoItem.isCompleted,
    };

    const access_Token = localStorage.getItem('accessToken');

    const response = await fetch(`${BASE_URL}/todos/${todoItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_Token}`,
      },
      body: JSON.stringify(updatedTodoItem),
    });

    const data = await response.json();

    if (response.ok) {
      setTodos((todos) =>
        todos?.map((todo) => (todo.id === todoItem.id ? data : todo))
      );
    }

    if (!response.ok) {
      throw new Error(data.message || '업데이트에 문제가 발생했습니다.');
    }
  }, []);

  const handleDelete = useCallback(async (todoItem: TodoItemType) => {
    const access_token = localStorage.getItem('accessToken');

    const response = await fetch(`${BASE_URL}/todos/${todoItem.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.ok) {
      setTodos((todos) => todos?.filter((todo) => todo.id !== todoItem.id));
    }
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || '정상적으로 삭제되지 않았습니다.');
    }
  }, []);

  useEffect(() => {
    const access_token = localStorage.getItem('accessToken');

    if (!access_token) {
      navigate('/signin');
      return;
    }

    getTodos();
  }, [getTodos, navigate]);

  useEffect(() => {
    const checkStorageToken = (event: StorageEvent) => {
      if (event.key === 'accessToken') {
        if (!event.newValue) {
          navigate('/signin');
        }
      }
    };

    window.addEventListener('storage', checkStorageToken);

    return () => {
      window.removeEventListener('storage', checkStorageToken);
    };
  }, [navigate]);

  return (
    <main className="w-full flex flex-col justify-center items-center">
      <AddTodo
        todoText={todoText}
        setTodoText={setTodoText}
        setTodos={setTodos}
      />
      <hr />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        handleComplete={handleComplete}
        handleDelete={handleDelete}
      />
    </main>
  );
};

export default memo(Todo);
