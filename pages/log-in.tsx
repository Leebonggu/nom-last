import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/atom/Button';
import Input from '../components/atom/Input';
import FormContainer from '../components/FormContainer';
import useMutation from '../lib/useMutation';

interface LoginForm {
  email: string;
  password: string;
}

interface LoginResponse {
  ok: boolean;
  message?: string;
}

const Login: NextPage = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<LoginForm>();
  const [login, { loading, data }] = useMutation<LoginForm, LoginResponse>(
    '/api/users/login',
  );

  const onValid = (data: LoginForm) => {
    if (loading) return;
    login(data);
  };

  useEffect(() => {
    if (data?.ok) {
      router.push('/');
    }
  }, [data, router]);

  return (
    <FormContainer
      title='로그인'
      redirect={{
        url: '/create-account',
        text: '아직 회원이 아니신가요?',
      }}
      errorMsg={data?.message}
    >
      <form onSubmit={handleSubmit(onValid)} className='grid gap-5'>
        <Input
          register={register('email', { required: true })}
          name='email'
          type='text'
        />
        <Input
          register={register('password', { required: true })}
          name='password'
          type='password'
        />
        <Button title='Login' />
      </form>
    </FormContainer>
  );
};

export default Login;
