import TodoItem from './TodoItem';
import { TodoItemType } from '../types/index';

interface TodosProps {
  todos: TodoItemType[];
  handleComplete: (todoItem: TodoItemType) => void;
  handleDelete: (todoItem: TodoItemType) => void;
}

const TodoList: React.FC<TodosProps> = ({
  todos,
  handleComplete,
  handleDelete,
}) => {
  return (
    <ul>
      <TodoItem
        todos={todos}
        handleComplete={handleComplete}
        handleDelete={handleDelete}
      />
    </ul>
  );
};

export default TodoList;
