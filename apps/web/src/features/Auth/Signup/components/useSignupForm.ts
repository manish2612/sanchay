import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupValues } from '../schema';
import { useSignupMutation } from '../../api';

export function useSignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const [signup, { isLoading }] = useSignupMutation();

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      mobileno: '',
      password: '',
      terms: false,
    },
  });

  const onSubmit = async (data: SignupValues) => {
    setGlobalError(null);
    try {
      // Exclude 'terms' for the API request as it's typically just UI validation
      await signup({
        username: data.username,
        email: data.email,
        mobileno: data.mobileno,
        password: data.password,
      }).unwrap();

      setSubmittedEmail(data.email);
      setIsSuccess(true);
    } catch (err: any) {
      if (err?.status === 409) {
        setGlobalError('An account with this email already exists.');
      } else if (err?.status === 400) {
        setGlobalError('Invalid request. Please check your information.');
      } else if (err?.status === 500) {
        setGlobalError('Server error. Please try again later.');
      } else if (err?.data?.message) {
        setGlobalError(err.data.message);
      } else if (err?.error) {
        setGlobalError(err.error);
      } else {
        setGlobalError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return {
    form,
    onSubmit,
    globalError,
    isSuccess,
    submittedEmail,
    isLoading,
    showPassword,
    setShowPassword,
  };
}
