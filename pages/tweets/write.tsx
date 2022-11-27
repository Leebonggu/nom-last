import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/atom/Button';
import FormContainer from '../../components/FormContainer';
import useMutation from '../../lib/useMutation';

interface WriteTweetForm {
  post: string;
}

interface WriteTweetResponse {
  ok: boolean;
  post: any;
}

function WriteTweet() {
  const { register, handleSubmit } = useForm<WriteTweetForm>();

  const [write, { loading, data }] = useMutation<
    WriteTweetForm,
    WriteTweetResponse
  >('/api/tweets');

  const onValid = (data: WriteTweetForm) => {
    if (loading) return;
    write(data);
  };

  console.log(data);

  return (
    <FormContainer title='New Tweet'>
      <form onSubmit={handleSubmit(onValid)}>
        <div className='h-30'>
          <textarea
            className='w-full p-2 mb-5 border-[1px] rounded-lg resize-none'
            rows={8}
            {...register('post', { required: true })}
            placeholder='Tweet을 입력해주세요.'
          />
        </div>
        <Button title='Write' />
      </form>
    </FormContainer>
  );
}

export default WriteTweet;
