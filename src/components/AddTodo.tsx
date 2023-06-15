import { memo, useCallback } from 'react';
import { BASE_URL } from '../api/url';
import { TodoItemType } from '../types/index';
import { BsPlusLg } from 'react-icons/bs';

interface AddTodoProps {
  todoText: string;
  setTodoText: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
}

const AddTodo: React.FC<AddTodoProps> = ({
  todoText,
  setTodoText,
  setTodos,
}) => {
  const handleSubmit = useCallback(
    async (
      event:
        | React.FormEvent<HTMLFormElement>
        | React.KeyboardEvent<HTMLInputElement>
    ) => {
      event.preventDefault();

      if (!todoText) {
        return;
      }

      const reqbody = {
        todo: todoText,
      };

      const access_token = localStorage.getItem('accessToken');

      const response = await fetch(`${BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(reqbody),
      });

      const resData = await response.json();

      if (response.ok) {
        setTodos((todos) => [...todos, resData]);
        setTodoText('');
      }

      if (!response.ok) {
        throw new Error(
          resData.message || '할일이 정상적으로 추가되지 않았습니다.'
        );
      }
    },
    [setTodoText, setTodos, todoText]
  );

  const handleOnkeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        pt-5
        w-full
        text-center
        flex
        flex-col
        items-center
				sticky
				top-0
				bg-white
      "
    >
      <h2 className="text-xl w-full text-center">
        새로운 할 일을 추가해보세요
      </h2>
      <div className="flex w-5/6 gap-3 my-5 relative">
        <input
          data-testid="new-todo-input"
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          onKeyPress={handleOnkeyPress}
          placeholder="할 일을 작성하고 엔터키나 추가 버튼을 눌러주세요"
          className="
            w-full
            focus:outline-zinc-400
            border
						focus:shadow-bg-shadow
						z-10
            px-4
            py-3
            rounded-sm
            border-slate-400
						"
        />
        <button
          data-testid="new-todo-add-button"
          className="
          min-w-[2rem]
          px-3
					py-2
					z-20
          hover:rotate-90
					active:rotate-180
					transition
					absolute
					right-1
					top-1
					text-slate-400
        "
        >
          <BsPlusLg size={30} />
        </button>
      </div>
    </form>
  );
};

export default memo(AddTodo);
