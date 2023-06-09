import TodoItem from './TodoItem';
import { TodoItemType } from '../types/index';

interface TodosProps {
  todos: TodoItemType[];
  handleComplete: (todoItem: TodoItemType) => void;
}

const TodoList: React.FC<TodosProps> = ({ todos, handleComplete }) => {
  return (
    <ul>
      <TodoItem todos={todos} handleComplete={handleComplete} />
    </ul>
  );
};

export default TodoList;
