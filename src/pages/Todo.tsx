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
    // console.log('reqbody: ', updatedTodoItem);
    // console.log('todoItem.id: ', todoItem.id);

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
      const updatedList = todos.map((todo) => {
        if (todo.id === todoItem.id) {
          console.log('data', data);
          return data;
        }
        return todo;
      });
      setTodos(updatedList);
    }

    if (!response.ok) {
      throw new Error(data.message || '업데이트에 문제가 발생했습니다.');
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
      <TodoList todos={todos} handleComplete={handleComplete} />
    </>
  );
};

export default Todo;
