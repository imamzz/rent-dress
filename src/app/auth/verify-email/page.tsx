'use client';

import { Alert } from "@/src/components/molecules/Alert";
import { Button } from "@/src/components/molecules/Button";
import CheckCircle from "@/src/components/icons/CheckCircle";
import { OTPInput } from "@/src/components/public/OTPInput";
import Link from "next/link";
import { useEffect, useState } from "react";

export function VerifyEmailPage() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const email = "user@example.com";

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      // setCanResend(true);
    }
  }, [timer]);

  const handleVerify = () => {
    setError('');
    
    if (otp.length !== 6) {
      setError('Please enter the complete verification code');
      return;
    }
    
    console.log('Verifying OTP:', otp);
    
    if (otp === '123456') {
      setSuccess(true);
    } else {
      setError('Invalid verification code. Please try again.');
      setOtp('');
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    
    console.log('Resending verification code');
    setOtp('');
    setError('');
    setTimer(60);
    setCanResend(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (success) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              {/* <CheckCircle className="text-green-600" size={32} /> */}
              <CheckCircle />
            </div>

            <div className="text-center mb-6">
              <h1 className="text-3xl mb-2">Email verified!</h1>
              <p className="text-neutral-600">
                Your email has been successfully verified
              </p>
            </div>

            <div className="mb-6">
              <Alert 
                type="success" 
                message="You can now access all features of your account." 
              />
            </div>

            <Link href="/">
              <Button type="button" variant="primary" fullWidth>
                Continue to catalog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            {/* <Mail className="text-blue-600" size={32} /> */}
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl mb-2">Verify your email</h1>
            <p className="text-neutral-600">
              We sent a verification code to
            </p>
            <p className="text-neutral-900 mt-1">{email}</p>
          </div>

          {error && (
            <div className="mb-6">
              <Alert type="error" message={error} />
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm text-neutral-700 mb-3 text-center">
              Enter verification code
            </label>
            <OTPInput 
              length={6} 
              value={otp} 
              onChange={setOtp}
            />
          </div>

          <Button 
            type="button" 
            variant="primary" 
            fullWidth
            onClick={handleVerify}
            disabled={otp.length !== 6}
          >
            Verify email
          </Button>

          <div className="mt-6 text-center">
            {!canResend ? (
              <p className="text-sm text-neutral-600">
                Didn&#39;t receive the code?{' '}
                <span className="text-neutral-900">
                  Resend in {formatTime(timer)}
                </span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Resend verification code
              </button>
            )}
          </div>

          <div className="mt-6 bg-neutral-50 rounded-lg p-4">
            <p className="text-sm text-neutral-700">
              <strong>Didn&#39;t receive the email?</strong>
            </p>
            <ul className="text-sm text-neutral-600 mt-2 space-y-1 list-disc list-inside">
              <li>Check your spam or junk folder</li>
              <li>Make sure the email address is correct</li>
              <li>Wait a few moments and check again</li>
            </ul>
          </div>

          <p className="text-center text-sm text-neutral-600 mt-6">
            Wrong email?{' '}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Go back
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}