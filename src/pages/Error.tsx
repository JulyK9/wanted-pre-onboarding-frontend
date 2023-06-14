import { useNavigate, useRouteError } from 'react-router-dom';
import { HiArrowUp } from 'react-icons/hi';

interface RouteError {
  statusText?: string;
  message?: string;
}

const Error: React.FC = () => {
  const error = useRouteError() as RouteError;

  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-2">
      <h1 className="text-red-900 text-[1.5rem]">
        서비스를 제공하는 페이지가 아닙니다.
      </h1>
      <p className="text-md">예상치 못한 오류가 발생되었습니다.</p>
      <p>
        <i className="text-red-500">{error?.statusText || error?.message}</i>
      </p>
      <div className="w-full flex flex-col justify-center items-center mt-5">
        <div className="flex flex-col items-center">
          <button
            onClick={() => navigate('/')}
            className="text-green-800 border border-neutral-300 px-6 py-3 text-lg my-3 rounded-md shadow-md hover:bg-slate-100 active:bg-slate-200"
          >
            홈으로 가기
          </button>
          <div className="my-5 border border-slate-400 p-2 text-sky-600 bg-slate-100 rounded-full animate-bounce">
            <HiArrowUp size={20} />
          </div>
          <p>Home 페이지로 돌아가려면 버튼을 눌러주세요</p>
        </div>
      </div>
    </div>
  );
};

export default Error;
