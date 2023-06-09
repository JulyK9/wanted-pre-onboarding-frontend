import { useEffect, useState } from 'react';
import { BASE_URL } from '../api/url';
import TodoItem from './TodoItem';
import { TodoItemType } from '../types/index';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);

  useEffect(() => {
    const access_token = localStorage.getItem('accessToken');

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
  }, []);
  // console.log('todos: ', todos);

  return (
    <>
      <TodoItem todos={todos} />
    </>
  );
};

export default TodoList;
