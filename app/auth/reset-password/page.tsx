'use client';

import { Alert } from "@/components/molecules/Alert";
import { Button } from "@/components/molecules/Button";
import { Input } from "@/components/molecules/Input";
import CheckCircle from "@/components/icons/CheckCircle";
import Link from "next/link";
import { useState } from "react";

const ResetPassword = () => {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (validateForm()) {
      // Simulate password reset - in production, call your API here
      console.log('Password reset submitted');
      setSuccess(true);
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        // navigate('/');
      }, 2000);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              {/* <CheckCircle className="text-green-600" size={32} /> */}
              <CheckCircle  />
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-3xl mb-2">Password reset</h1>
              <p className="text-neutral-600">
                Your password has been successfully reset
              </p>
            </div>

            {/* Success Alert */}
            <div className="mb-6">
              <Alert 
                type="success" 
                message="Redirecting you to the login page..." 
              />
            </div>

            <Link href="/">
              <Button type="button" variant="primary" fullWidth>
                Continue to sign in
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
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-2">Reset password</h1>
            <p className="text-neutral-600">
              Please enter your new password
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6">
              <Alert type="error" message={error} />
            </div>
          )}

          {/* Info Alert */}
          <div className="mb-6">
            <Alert 
              type="info" 
              message="Your password must be at least 8 characters long and contain a mix of letters, numbers, and special characters." 
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                label="New Password"
                type="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
                showPasswordToggle
              />
              {/* <PasswordStrength password={formData.password} /> */}
            </div>

            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
              showPasswordToggle
            />

            <Button type="submit" variant="primary" fullWidth>
              Reset password
            </Button>
          </form>

          {/* Back to Login */}
          <p className="text-center text-sm text-neutral-600 mt-6">
            Remember your password?{' '}
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword