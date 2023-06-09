import { TodoItemType } from '../types/index';

interface TodoItemProps {
  todos: TodoItemType[];
}

const TodoItem: React.FC<TodoItemProps> = ({ todos }) => {
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

export default TodoItem;
