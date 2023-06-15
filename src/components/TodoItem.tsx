import { useState, useEffect, useRef, memo, useCallback, useMemo } from 'react';
import { TodoItemType } from '../types/index';
import { BASE_URL } from '../api/url';
import { BsTrash } from 'react-icons/bs';
import { LuEdit } from 'react-icons/lu';
import { BiMessageSquareCheck, BiMessageSquareX } from 'react-icons/bi';

interface TodoItemProps {
  todo: TodoItemType;
  setTodos: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
  handleComplete: (todoItem: TodoItemType) => void;
  handleDelete: (todoItem: TodoItemType) => void;
}

const TodoItem = ({
  todo,
  setTodos,
  handleComplete,
  handleDelete,
}: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodoText, setEditTodoText] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpdate = useCallback(
    async (e: React.FormEvent, todoItem: TodoItemType) => {
      e.preventDefault();

      if (editTodoText === todoItem.todo) {
        setIsEdit((prev) => !prev);
        return;
      }

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

        setTodos((todos) =>
          todos.map((todo) => (todo.id === todoItem.id ? resData : todo))
        );
        setIsEdit((prev) => !prev);
        inputRef.current?.blur();
      }

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(
          resData.message || '정상적으로 업데이트되지 않았습니다.'
        );
      }
    },
    [editTodoText, setTodos]
  );

  const handleCancel = () => {
    setIsEdit((prev) => !prev);
    setEditTodoText(todo.todo);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEdit]);

  return useMemo(() => {
    return (
      <li
        key={todo.id}
        className={`
      w-full
      hover:scale-105
      rounded-sm
      border
      px-5
      py-3
      flex
      gap-2
      justify-between
      items-center
      ${isEdit ? 'shadow-md' : 'shadow-none'}
      ${isEdit ? 'translate-x-4' : ''}
      `}
      >
        <label
          htmlFor={todo.id.toString()}
          className="flex items-center w-full gap-2 truncate"
        >
          <input
            type="checkbox"
            id={todo.id.toString()}
            checked={todo.isCompleted}
            onChange={() => handleComplete(todo)}
            className="mx-2 form-checkbox w-4 h-4 opacity-0 absolute transition duration-150"
          />
          <div className="bg-gray-100 border rounded-sm border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center focus-within:border-gray-500">
            <svg
              className="fill-current hidden w-3 h-3 text-gray-600 pointer-events-none"
              version="1.1"
              viewBox="0 0 17 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <g transform="translate(-9 -11)" fill="gray" fillRule="nonzero">
                  <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                </g>
              </g>
            </svg>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="w-full">
              {!isEdit ? (
                <span className="text-md px-2 ml-1 w-fit truncate">
                  {todo.todo}
                </span>
              ) : (
                <input
                  data-testid="modify-input"
                  type="text"
                  value={editTodoText}
                  ref={inputRef}
                  onChange={(e) => setEditTodoText(e.target.value)}
                  className={`
              bg-white
              focus:bg-neutral-100
              w-full
              border-b-2
              px-3
              py-2
              outline-none
              `}
                />
              )}
            </div>
          </div>
        </label>
        <div className="min-w-fit">
          {!isEdit && (
            <div className="flex gap-1 w-full">
              <button
                data-testid="modify-button"
                onClick={() => setIsEdit((prev) => !prev)}
                className="
              hover:bg-sky-100
              active:bg-sky-200
              px-2
              py-2
              rounded-md
              text-sm
              "
              >
                <LuEdit size={24} />
              </button>
              <button
                data-testid="delete-button"
                onClick={() => handleDelete(todo)}
                className="
              hover:bg-red-100
              active:bg-red-200
              px-2
              py-2
              rounded-md
              text-sm
              "
              >
                <BsTrash size={24} />
              </button>
            </div>
          )}
          {isEdit && (
            <div>
              <button
                data-testid="submit-button"
                onClick={(e) => handleUpdate(e, todo)}
                className="
              hover:text-sky-500
              active:bg-sky-200
              px-2
              py-2
              rounded-md
              text-sm
              "
              >
                <BiMessageSquareCheck size={24} />
              </button>
              <button
                data-testid="cancel-button"
                type="button"
                onClick={handleCancel}
                className="
              hover:text-red-500
              active:bg-red-200
              px-2
              py-2
              rounded-md
              text-sm
              "
              >
                <BiMessageSquareX size={24} />
              </button>
            </div>
          )}
        </div>
      </li>
    );
  }, [todo, editTodoText, isEdit]);
};

export default memo(TodoItem);
