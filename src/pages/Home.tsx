import { HiArrowUp } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col justify-center items-center mt-40">
      <h2 className="mb-12 text-xl">여기는 home 입니다</h2>
      <div className="flex flex-col items-center">
        <button
          onClick={() => navigate('/todo')}
          className="border border-neutral-300 px-10 py-5 text-lg my-3 rounded-md shadow-md hover:bg-slate-100 active:bg-slate-200"
        >
          Go Todo Page
        </button>
        <div className="my-5 border border-slate-400 p-2 text-sky-600 bg-slate-100 rounded-full animate-bounce">
          <HiArrowUp size={25} />
        </div>
        <p>Todo 페이지로 편하게 가시려면 버튼을 눌러주세요</p>
      </div>
    </div>
  );
};

export default Home;
