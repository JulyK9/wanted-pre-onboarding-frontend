import { useState } from 'react';
import { TodoItemType } from '../types/index';
import { BASE_URL } from '../api/url';

interface TodoItemProps {
  todo: TodoItemType;
  todos: TodoItemType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
  handleComplete: (todoItem: TodoItemType) => void;
  handleDelete: (todoItem: TodoItemType) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  todos,
  setTodos,
  handleComplete,
  handleDelete,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [editTodoText, setEditTodoText] = useState<string>(todo.todo);

  const handleUpdate = async (e: React.FormEvent, todoItem: TodoItemType) => {
    e.preventDefault();

    const editedTodoItem = {
      ...todoItem,
      todo: editTodoText,
    };

    const access_token = localStorage.getItem('accessToken');

    const response = await fetch(`${BASE_URL}/todos/${todoItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(editedTodoItem),
    });

    if (response.ok) {
      const resData = await response.json();
      console.log('resData: ', resData);
      const editedTodoList = todos.map((todo) => {
        if (todo.id === todoItem.id) {
          return resData;
        }
        return todo;
      });

      setTodos(editedTodoList);
      setIsEdit((prev) => !prev);
    }

    if (!response.ok) {
      const resData = await response.json();
      throw new Error(resData.message || '정상적으로 업데이트되지 않았습니다.');
    }
  };

  return (
    <li key={todo.id}>
      <label htmlFor={todo.id.toString()}>
        <input
          type="checkbox"
          id={todo.id.toString()}
          checked={todo.isCompleted}
          onChange={() => handleComplete(todo)}
        />
      </label>
      <div>
        {isEdit && (
          <>
            <span>{todo.todo}</span>
            <button
              data-testid="modify-button"
              onClick={() => setIsEdit((prev) => !prev)}
            >
              수정
            </button>
            <button
              data-testid="delete-button"
              onClick={() => handleDelete(todo)}
            >
              삭제
            </button>
          </>
        )}
        {!isEdit && (
          <form>
            <label htmlFor={todo.id.toString()}>
              <input
                data-testid="modify-input"
                type="text"
                value={editTodoText}
                onChange={(e) => setEditTodoText(e.target.value)}
              />
            </label>
            <button
              data-testid="submit-button"
              onClick={(e) => handleUpdate(e, todo)}
            >
              제출
            </button>
            <button
              data-testid="cancel-button"
              onClick={() => setIsEdit((prev) => !prev)}
            >
              취소
            </button>
          </form>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
