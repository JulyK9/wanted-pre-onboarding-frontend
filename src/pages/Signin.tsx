import { useState, useEffect } from 'react';
import { BASE_URL } from '../api/url';
import { useNavigate } from 'react-router-dom';

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  const navigate = useNavigate();

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const reqBody = {
      email,
      password,
    };

    const loginRes = await fetch(`${BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    });

    const resData = await loginRes.json();

    if (!loginRes.ok) {
      throw new Error(
        resData.message || '로그인이 정상적으로 완료되지 않았습니다.'
      );
    }

    console.log('resData: ', resData);
    localStorage.setItem('accessToken', resData.access_token);

    navigate('/todo');
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      return navigate('/todo');
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
    <div>
      <h2>로그인</h2>
      <form onSubmit={loginHandler}>
        <label>
          이메일
          <input
            data-testid="email-input"
            type="email"
            name="email"
            value={email}
            placeholder="이메일을 입력하세요"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {email && !emailValid && <p>유효하지 않은 이메일 입니다.</p>}
        </label>
        <label>
          비밀번호
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {password && !passwordValid && (
            <p>비밀번호는 8자 이상이어야 합니다.</p>
          )}
        </label>
        <button
          type="submit"
          data-testid="signin-button"
          disabled={!emailValid || !passwordValid}
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default Signin;
