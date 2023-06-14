import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface AuthProps {
  label: string;
  pageLabel: string;
  handlerFunc: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const Auth: React.FC<AuthProps> = ({
  label,
  pageLabel,
  handlerFunc,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      navigate('/todo');
      return;
    }

    if (!email || !email.includes('@')) {
      setEmailValid(false);
      return;
    }
    setEmailValid(true);

    if (!password || password.length < 8) {
      setPasswordValid(false);
      return;
    }

    setPasswordValid(true);
  }, [email, password, navigate]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl">{label}</h2>
      <form
        onSubmit={handlerFunc}
        className="w-2/5 px-10 py-8 flex flex-col items-center justify-center"
      >
        <label className="w-full flex flex-col items-start gap-2 mb-3">
          이메일
          <input
            data-testid="email-input"
            type="email"
            name="email"
            value={email}
            placeholder="이메일을 입력하세요"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full
              outline-none
              border
              border-neutral-400
              rounded-md
              px-4
              py-2
              focus:border-2
              focus:border-green-600
              mb-1
            "
          />
          {email && !emailValid && (
            <p className="mb-5  text-red-500">유효하지 않은 이메일 입니다.</p>
          )}
        </label>
        <label className="w-full flex flex-col items-start gap-2 mb-5">
          비밀번호
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              w-full
              outline-none
              border
              border-neutral-400
              rounded-md
              px-4
              py-2
              focus:border-2
              focus:border-green-600
              mb-1
            "
          />
          {password && !passwordValid && (
            <p className="mb-3 text-red-500">
              비밀번호는 8자 이상이어야 합니다.
            </p>
          )}
        </label>
        <hr className="w-full border-1 border-zinc-200 shadow-md mb-2" />
        <button
          type="submit"
          data-testid={`${pageLabel}-button`}
          disabled={!emailValid || !passwordValid}
          className={`
            w-full
            border
            border-neutral-400
            px-2
            py-3
            mt-4
            rounded-md
            hover:bg-gradient-to-r from-emerald-500 from-10% via-sky-600 via-30% to-indigo-500 to-80% opacity-70
            hover:text-sky-100
            hover:border-none
            hover:shadow-md
            ${
              !emailValid || !passwordValid
                ? 'cursor-not-allowed'
                : 'cursor-pointer'
            }
            `}
        >
          {label}
        </button>
      </form>
    </div>
  );
};

export default Auth;
