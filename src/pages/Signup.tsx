import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api/url';
import { useState } from 'react';
import { useSignup } from '../hooks/useAuth';
import Auth from '../components/Auth';

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const SubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const reqBody = {
      email,
      password,
    };

    const reqUrl = `${BASE_URL}/auth/signup`;

    useSignup(reqBody, reqUrl);

    alert('회원가입 성공. 로그인 페이지로 이동합니다.');
    navigate('/signin');
  };

  return (
    <Auth
      label="회원가입"
      pageLabel="signup"
      handlerFunc={SubmitHandler}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );
};

export default Signup;
