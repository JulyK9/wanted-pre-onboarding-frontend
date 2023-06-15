/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useState } from 'react';
import { BASE_URL } from '../api/url';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';
import Auth from '../components/Auth';

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const loginHandler = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const reqBody = {
        email,
        password,
      };

      const reqUrl = `${BASE_URL}/auth/signin`;

      const resData = await useLogin(reqBody, reqUrl);

      localStorage.setItem('accessToken', resData?.access_token);

      alert('로그인 성공. todo 페이지로 이동합니다.');
      navigate('/todo');
    },
    [email, password, navigate]
  );

  return (
    <Auth
      label="로그인"
      pageLabel="signin"
      handlerFunc={loginHandler}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
    />
  );
};

export default Signin;
