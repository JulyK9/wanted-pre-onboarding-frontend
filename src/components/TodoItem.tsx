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
    <li
      key={todo.id}
      className="
      w-full
      border
      border-slate-200
      hover:border-slate-400
      hover:scale-105
      rounded-sm
      px-5
      py-3
      flex
      gap-4
      justify-between
      items-center
      "
    >
      <label htmlFor={todo.id.toString()} className="block">
        <input
          type="checkbox"
          id={todo.id.toString()}
          checked={todo.isCompleted}
          onChange={() => handleComplete(todo)}
          className="mx-2"
        />
        {isEdit ? (
          <span className="text-md">{todo.todo}</span>
        ) : (
          <input
            data-testid="modify-input"
            type="text"
            value={editTodoText}
            onChange={(e) => setEditTodoText(e.target.value)}
            className="
                focus:outline-zinc-400
                border
                px-2
                py-1
                rounded-sm
                border-slate-400"
          />
        )}
      </label>
      <div>
        {isEdit && (
          <div className="flex gap-2">
            <button
              data-testid="modify-button"
              onClick={() => setIsEdit((prev) => !prev)}
              className="
              hover:bg-sky-100
              active:bg-sky-200
              px-3
              py-2
              rounded-md
              "
            >
              수정
            </button>
            <button
              data-testid="delete-button"
              onClick={() => handleDelete(todo)}
              className="
              hover:bg-red-100
              active:bg-red-200
              px-3
              py-2
              rounded-md
              "
            >
              삭제
            </button>
          </div>
        )}
        {!isEdit && (
          <form>
            {/* <label htmlFor={todo.id.toString()}>
              <input
                data-testid="modify-input"
                type="text"
                value={editTodoText}
                onChange={(e) => setEditTodoText(e.target.value)}
              />
            </label> */}
            <button
              data-testid="submit-button"
              onClick={(e) => handleUpdate(e, todo)}
              className="
              hover:bg-sky-100
              active:bg-sky-200
              px-3
              py-2
              rounded-md
              "
            >
              제출
            </button>
            <button
              data-testid="cancel-button"
              onClick={() => setIsEdit((prev) => !prev)}
              className="
              hover:bg-red-100
              active:bg-red-200
              px-3
              py-2
              rounded-md
              "
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
