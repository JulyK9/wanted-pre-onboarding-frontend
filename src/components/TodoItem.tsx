import { TodoItemType } from '../types/index';

interface TodoItemProps {
  todos: TodoItemType[];
  handleComplete: (todoItem: TodoItemType) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todos, handleComplete }) => {
  return (
    <>
      {todos &&
        todos.map((todo: TodoItemType) => (
          <li key={todo.id}>
            <label htmlFor="isCompleted">
              <input
                type="checkbox"
                id="isCompleted"
                checked={todo.isCompleted}
                onChange={() => handleComplete(todo)}
              />
              <span>{todo.todo}</span>
            </label>
          </li>
        ))}
    </>
  );
};

export default TodoItem;
