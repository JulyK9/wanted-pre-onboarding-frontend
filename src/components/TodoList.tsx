import { useEffect, useState } from 'react';
import { BASE_URL } from '../api/url';
import TodoItem from './TodoItem';
import { TodoItemType } from '../types/index';

interface TodosProps {
  todos: TodoItemType[];
}

const TodoList: React.FC<TodosProps> = ({ todos }) => {
  return (
    <ul>
      <TodoItem todos={todos} />
    </ul>
  );
};

export default TodoList;
