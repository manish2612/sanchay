'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, TextInput, Button, Icon, UniversalLink, Switch } from '@prime/ui';
import { signupSchema, type SignupValues } from '../schema';

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      phone: '',
      password: '',
      terms: false,
    },
  });

  const onSubmit = async (data: SignupValues) => {
    // API logic will go here later
    setGlobalError(null);

    // Simulate API delay for UI demonstration
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Example of how a global error would be set on failure:
    // setGlobalError('This email is already in use.');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
        {/* Global Error Banner */}
        {globalError && (
          <div className="p-3 mb-2 text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
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

        {/* Phone Field */}
        <Form.Field
          control={form.control}
          name="phone"
          render={({ field }) => (
            <Form.Item>
              <Form.Control>
                <TextInput
                  {...field}
                  label="Phone number"
                  labelVariant="default"
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                  autoComplete="tel"
                  className="h-12 px-4"
                  inputClassName="text-base ml-1"
                  leftSlot={<Icon name="Phone" size={20} className="text-muted-foreground/70" />}
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
                  placeholder="Create a password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
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

        {/* Terms of Service Switch */}
        <div className="pt-1">
          <Form.Field
            control={form.control}
            name="terms"
            render={({ field }) => (
              <Form.Item className="flex flex-row items-center space-x-2 space-y-0">
                <Form.Control>
                  <Switch checked={field.value} onCheckedChange={field.onChange} id="terms-of-service" />
                </Form.Control>
                <label
                  htmlFor="terms-of-service"
                  className="text-sm font-medium leading-none cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                >
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </Form.Item>
            )}
          />
          {/* Ensure error message for terms is displayed if validation fails */}
          {form.formState.errors.terms && (
            <p className="text-sm font-medium text-destructive mt-2">
              {form.formState.errors.terms.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full mt-4 h-12 text-base font-semibold"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Signing up...' : 'Sign up'}
        </Button>

        {/* Footer Link */}
        <div className="text-center mt-4 text-sm text-muted-foreground">
          Already have an account?{' '}
          <UniversalLink
            href="/login"
            className="font-semibold text-primary hover:underline hover:text-primary-hover transition-colors"
          >
            Log In
          </UniversalLink>
        </div>
      </form>
    </Form>
  );
}
