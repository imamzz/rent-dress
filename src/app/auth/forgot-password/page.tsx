'use client';

import { Button } from "@/src/components/molecules/Button";
import { Input } from "@/src/components/molecules/Input";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Simulate sending email - in production, call your API here
    console.log('Password reset requested for:', email);
    setEmailSent(true);
  };

  const handleResendEmail = () => {
    console.log('Resending email to:', email);
    // Show a toast or notification here
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              {/* <Mail className="text-green-600" size={32} /> */}
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl mb-2">Check your email</h1>
              <p className="text-neutral-600">
                We&#39;ve sent a password reset link to
              </p>
              <p className="text-neutral-900 mt-2">{email}</p>
            </div>

            {/* Success Alert */}
            <div className="mb-6">
              {/* <Alert 
                type="success" 
                message="If an account exists with this email, you will receive a password reset link shortly." 
              /> */}
            </div>

            {/* Instructions */}
            <div className="bg-neutral-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-neutral-700">
                <strong>Didn&#39;t receive the email?</strong>
              </p>
              <ul className="text-sm text-neutral-600 mt-2 space-y-1 list-disc list-inside">
                <li>Check your spam folder</li>
                <li>Make sure {email} is correct</li>
                <li>Wait a few minutes and try again</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                type="button" 
                variant="secondary" 
                fullWidth
                onClick={handleResendEmail}
              >
                Resend email
              </Button>

              <Link href="/auth/login">
                <Button type="button" variant="primary" fullWidth>
                  {/* <ArrowLeft size={20} /> */}
                  Back to sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-2">Forgot password?</h1>
            <p className="text-neutral-600">
              No worries, we&#39;ll send you reset instructions
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6">
              {/* <Alert type="error" message={error} /> */}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button type="submit" variant="primary" fullWidth>
              Reset password
            </Button>
          </form>

          {/* Back to Login */}
          <Link href="/auth/login" className="flex items-center justify-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mt-6">
            {/* <ArrowLeft size={16} /> */}
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}