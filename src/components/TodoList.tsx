import TodoItem from './TodoItem';
import { TodoItemType } from '../types/index';
import { memo } from 'react';

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
    <>
      <h2 className="w-5/6 text-start mb-2">To Do List</h2>
      <ul className="w-5/6 flex flex-col gap-3 items-center justify-center">
        {todos?.map((todo: TodoItemType) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setTodos={setTodos}
            handleComplete={handleComplete}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </>
  );
};

export default memo(TodoList);
