import TodoItem from './TodoItem';
import { TodoItemType } from '../types/index';

interface TodosProps {
  todos: TodoItemType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
  handleComplete: (todoItem: TodoItemType) => void;
  handleDelete: (todoItem: TodoItemType) => void;
}

const TodoList: React.FC<TodosProps> = ({
  todos,
  setTodos,
  handleComplete,
  handleDelete,
}) => {
  return (
    <ul>
      {todos.map((todo: TodoItemType) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          todos={todos}
          setTodos={setTodos}
          handleComplete={handleComplete}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default TodoList;
