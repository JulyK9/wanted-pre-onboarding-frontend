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

  const getTodos = async () => {
    const access_token = localStorage.getItem('accessToken');

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

  const handleComplete = async (todoItem: TodoItemType) => {
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
      const updatedTodos = todos.map((todo) => {
        if (todo.id === todoItem.id) {
          return data;
        }
        return todo;
      });
      setTodos(updatedTodos);
    }

    if (!response.ok) {
      throw new Error(data.message || '업데이트에 문제가 발생했습니다.');
    }
  };

  const handleDelete = async (todoItem: TodoItemType) => {
    const access_token = localStorage.getItem('accessToken');

    const response = await fetch(`${BASE_URL}/todos/${todoItem.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.ok) {
      const deletedTodos = todos.filter((todo) => todo.id !== todoItem.id);
      setTodos(deletedTodos);
    }
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || '정상적으로 삭제되지 않았습니다.');
    }
  };

  useEffect(() => {
    const access_token = localStorage.getItem('accessToken');

    if (!access_token) {
      navigate('/signin');
      return;
    }

    getTodos();
  }, [navigate]);

  return (
    <>
      <AddTodo
        todoText={todoText}
        setTodoText={setTodoText}
        todos={todos}
        setTodos={setTodos}
      />
      <hr />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        handleComplete={handleComplete}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default Todo;
