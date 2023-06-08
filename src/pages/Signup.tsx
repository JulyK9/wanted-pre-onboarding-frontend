import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api/url';
import { useEffect, useState } from 'react';

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  const navigate = useNavigate();

  const SubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const reqBody = {
      email,
      password,
    };

    const loginRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    });

    if (loginRes.ok) {
      alert('회원가입 성공. 로그인 페이지로 이동합니다.');
      navigate('/signin');
    }

    const resData = await loginRes.json();
    throw new Error(resData.message || '회원가입에 문제가 발생했습니다.');
  };

  useEffect(() => {
    const acccessToken = localStorage.getItem('accessToken');

    if (acccessToken) {
      navigate('/todo');
    }

    // validation
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
    navigate('/signin');
  }, [email, password, navigate]);

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={SubmitHandler}>
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
          data-testid="signup-button"
          disabled={!emailValid || !passwordValid}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Signup;
