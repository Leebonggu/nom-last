import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/atom/Button';
import Input from '../components/atom/Input';
import FormContainer from '../components/FormContainer';
import useMutation from '../lib/useMutation';

interface CreateAccountForm {
  email: string;
  password: string;
  passwordConfirm: string;
}

interface CreateAccountResponse {
  ok: boolean;
  message?: string;
}

const CreateAccount: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<CreateAccountForm>();
  const [create, { loading, data }] = useMutation<
    CreateAccountForm,
    CreateAccountResponse
  >('/api/users/register');

  const onValid = (data: CreateAccountForm) => {
    if (loading) return;
    create(data);
  };

  useEffect(() => {
    if (data?.ok) {
      router.push('/log-in');
    }
  }, [data, router]);

  return (
    <FormContainer
      title='회원가입'
      redirect={{
        url: '/log-in',
        text: '이미 회원이신가요?',
      }}
      errorMsg={data?.message}
    >
      <form onSubmit={handleSubmit(onValid)} className='grid gap-5'>
        <Input
          label='Email'
          register={register('email', { required: true })}
          name='email'
          type='text'
        />
        <Input
          label='Password'
          register={register('password', { required: true })}
          name='password'
          type='password'
        />
        <Input
          label='Password Confirm'
          register={register('passwordConfirm', { required: true })}
          name='passwordConfirm'
          type='password'
        />
        <Button title='Create' />
      </form>
    </FormContainer>
  );
};

export default CreateAccount;
