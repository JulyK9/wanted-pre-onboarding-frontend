interface ReqBodyProps {
  email: string;
  password: string;
}

export const useSignup = async (
  reqBody: ReqBodyProps,
  url: RequestInfo | URL
) => {
  const loginRes = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody),
  });

  if (!loginRes.ok) {
    const resData = await loginRes.json();
    throw new Error(resData.message || '회원가입에 문제가 발생했습니다.');
  }

  return;
};

export const useLogin = async (
  reqBody: ReqBodyProps,
  url: RequestInfo | URL
) => {
  const loginRes = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody),
  });

  if (!loginRes.ok) {
    const resData = await loginRes.json();
    throw new Error(
      resData.message || '로그인이 정상적으로 완료되지 않았습니다.'
    );
  }

  if (loginRes.ok) {
    const resData = await loginRes.json();
    return resData;
  }
};
