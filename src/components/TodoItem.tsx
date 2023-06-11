import { TodoItemType } from '../types/index';

interface TodoItemProps {
  todos: TodoItemType[];
  handleComplete: (todoItem: TodoItemType) => void;
  handleDelete: (todoItem: TodoItemType) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todos,
  handleComplete,
  handleDelete,
}) => {
  return (
    <>
      {todos &&
        todos.map((todo: TodoItemType) => (
          <li key={todo.id}>
            <label htmlFor={todo.id}>
              <input
                type="checkbox"
                id={todo.id}
                checked={todo.isCompleted}
                onChange={() => handleComplete(todo)}
              />
              <span>{todo.todo}</span>
            </label>
            <div>
              <button data-testid="modify-button">수정</button>
              <button
                data-testid="delete-button"
                onClick={() => handleDelete(todo)}
              >
                삭제
              </button>
            </div>
          </li>
        ))}
    </>
  );
};

export default TodoItem;
