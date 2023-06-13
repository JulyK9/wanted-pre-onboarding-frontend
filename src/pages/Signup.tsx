import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api/url';
import { useEffect, useState } from 'react';
import { useSignup } from '../hooks/useAuth';

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  const navigate = useNavigate();

  const SubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const reqBody = {
      email,
      password,
    };

    const reqUrl = `${BASE_URL}/auth/signup`;

    useSignup(reqBody, reqUrl);

    // const loginRes = await fetch(`${BASE_URL}/auth/signup`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(reqBody),
    // });

    // if (!loginRes.ok) {
    //   const resData = await loginRes.json();
    //   throw new Error(resData.message || '회원가입에 문제가 발생했습니다.');
    // }

    alert('회원가입 성공. 로그인 페이지로 이동합니다.');
    navigate('/signin');
  };

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
      <h2 className="text-2xl">회원가입</h2>
      <form
        onSubmit={SubmitHandler}
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
          data-testid="signup-button"
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
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Signup;
