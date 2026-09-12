'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, TextInput, Button, Icon, UniversalLink, Switch } from '@prime/ui';
import { loginSchema, type LoginValues } from '../schema';
import { useLoginMutation } from '../../api';
import { cookieTokenStorage } from '@/utils/tokenStorage';
import { useNavigate } from '@tanstack/react-router';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginValues) => {
    setGlobalError(null);

    try {
      const response = await login({
        cmp_id: '', // Empty string as per requirements
        email: data.email,
        password: data.password,
      }).unwrap();

      // Store the token natively
      if (response.token) {
        cookieTokenStorage.setToken(response.token);
      }

      // Route to dashboard on success
      navigate({ to: '/' });
    } catch (error: any) {
      const status = error?.status;
      // Provide conversational error messages based on HTTP status codes
      if (status === 401 || status === 403) {
        setGlobalError("The email or password you entered is incorrect. Please try again.");
      } else if (status === 404) {
        setGlobalError("We couldn't find an account with that email. Please sign up first.");
      } else if (status === 400) {
        setGlobalError("Please check your credentials and try again.");
      } else if (status >= 500) {
        setGlobalError("Our servers are taking a little break right now. Please try again in a moment.");
      } else {
        setGlobalError("An unexpected error occurred while trying to sign in. Please try again.");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
        {/* Global Error Banner */}
        {globalError && (
          <div className="p-3 mb-2 text-sm font-medium text-danger bg-danger/10 border border-danger/20 rounded-md">
            {globalError}
          </div>
        )}

        {/* Email Field */}
        <Form.Field
          control={form.control}
          name="email"
          render={({ field }) => (
            <Form.Item>
              <Form.Control>
                <TextInput
                  {...field}
                  label="Email address"
                  labelVariant="default"
                  placeholder="johndoe@company.com"
                  type="email"
                  autoComplete="email"
                  className="h-12 px-4"
                  inputClassName="text-base ml-1"
                  leftSlot={<Icon name="Mail" size={20} className="text-muted-foreground/70" />}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        {/* Password Field */}
        <Form.Field
          control={form.control}
          name="password"
          render={({ field }) => (
            <Form.Item>
              <Form.Control>
                <TextInput
                  {...field}
                  label="Password"
                  labelVariant="default"
                  placeholder="Enter password here"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className="h-12 px-4"
                  inputClassName="text-base ml-1"
                  leftSlot={<Icon name="Lock" size={20} className="text-muted-foreground/70" />}
                  rightSlot={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-sm transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
                    </button>
                  }
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-center justify-between pt-1">
          <Form.Field
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <Form.Item className="flex flex-row items-center space-x-2 space-y-0">
                <Form.Control>
                  <Switch checked={field.value} onCheckedChange={field.onChange} id="remember-me" />
                </Form.Control>
                <label
                  htmlFor="remember-me"
                  className="text-sm font-medium leading-none cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                >
                  Remember me
                </label>
              </Form.Item>
            )}
          />

          <UniversalLink
            href="/forgot-password"
            className="text-sm font-medium text-primary hover:underline hover:text-primary-hover transition-colors"
          >
            Forgot password?
          </UniversalLink>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full mt-4 h-12 text-base font-semibold"
          disabled={isLoading || form.formState.isSubmitting}
        >
          {isLoading || form.formState.isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>

        {/* Footer Link */}
        <div className="text-center mt-4 text-sm text-muted-foreground">
          Don't have an account?{' '}
          <UniversalLink
            href="/signup"
            className="font-semibold text-primary hover:underline hover:text-primary-hover transition-colors"
          >
            Sign up
          </UniversalLink>
        </div>
      </form>
    </Form>
  );
}
