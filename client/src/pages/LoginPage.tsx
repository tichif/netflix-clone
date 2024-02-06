import { createContext, useState } from 'react';
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Input from '../components/Input';
import useAuth from '../hooks/useAuth';

enum Variant {
  SIGN_UP,
  LOGIN,
}

export type Inputs = {
  email: string;
  username: string;
  password: string;
};

interface AuthFormContextType {
  register: null | UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs> | null;
}

export const AuthFormContext = createContext<AuthFormContextType>({
  register: null,
  errors: null,
});
const LoginPage = () => {
  const [variant, setVariant] = useState<Variant>(Variant.LOGIN);
  const [authError, setAuthError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();

  const { signup, login } = useAuth();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (variant === Variant.SIGN_UP) {
        await signup(data);
      } else {
        await login(data);
      }
      setAuthError('');
      navigate('/browse');
    } catch (error: any) {
      setAuthError(error.response.data.errors[0].msg);
    }
  };

  const handleSwitch = () => {
    if (variant === Variant.LOGIN) {
      setVariant(Variant.SIGN_UP);
    } else {
      setVariant(Variant.LOGIN);
    }

    setAuthError('');
  };

  return (
    <div className='relative bg-black h-screen w-screen bg-opacity-50'>
      <Navbar />
      <div className='flex justify-center items-center h-full'>
        <div className='bg-black bg-opacity-70 p-16 self-center mt-2 w-full max-w-md rounded'>
          <h2 className='text-white text-4xl mb-8 font-semibold'>
            {variant === Variant.LOGIN ? 'Sign In' : 'Sign Up'}
          </h2>
          <AuthFormContext.Provider value={{ register, errors }}>
            <form
              className='flex flex-col gap-4'
              onSubmit={handleSubmit(onSubmit)}
            >
              {variant === Variant.SIGN_UP && (
                <Input
                  id='username'
                  type='text'
                  label='Username'
                  name='username'
                />
              )}
              <Input
                id='email'
                type='email'
                label='Email Address'
                name='email'
              />
              <Input
                id='password'
                type='password'
                label='Password'
                name='password'
                validate={
                  variant === Variant.SIGN_UP
                    ? () => {
                        const password = getValues('password');
                        if (password.length < 6) {
                          return 'Password must be greater than 6 characters';
                        }
                        return true;
                      }
                    : undefined
                }
              />
              <input
                type='submit'
                className='bg-red-400 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700'
                value='Submit'
              />

              {authError && <p className='text-red-500'>{authError}</p>}
            </form>
          </AuthFormContext.Provider>
          {variant === Variant.LOGIN ? (
            <p className='text-neutral-500 mt-12' onClick={handleSwitch}>
              <span className='text-white ml-1 hover:underline cursor-pointer'>
                First time using Netflix ?
              </span>
            </p>
          ) : (
            <p className='text-neutral-500 mt-12' onClick={handleSwitch}>
              <span className='text-white ml-1 hover:underline cursor-pointer'>
                Already have an account ?
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
