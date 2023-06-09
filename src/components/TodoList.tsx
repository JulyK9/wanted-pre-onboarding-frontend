import { useEffect, useState } from 'react';
import { BASE_URL } from '../api/url';

interface todoItem {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<todoItem[]>();

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
      {todos &&
        todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input type="checkbox" />
              <span>{todo.todo}</span>
            </label>
          </li>
        ))}
    </>
  );
};

export default TodoList;
