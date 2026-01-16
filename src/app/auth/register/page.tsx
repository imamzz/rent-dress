import { Button } from "@/src/components/molecules/Button"
import { Input } from "@/src/components/molecules/Input"
import Google from "@/src/components/icons/Google"
import Link from "next/link"

const RegisterPage = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-2">Create an account</h1>
            <p className="text-neutral-600">Get started with your free account</p>
          </div>

          {/* Error Alert */}
          {/* {error && (
            <div className="mb-6">
              <Alert type="error" message={error} />
            </div>
          )} */}

          {/* Form */}
          <form  className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
            //   value={formData.fullName}
            //   onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            //   error={errors.fullName}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
            //   value={formData.email}
            //   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            //   error={errors.email}
            />

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Create a password"
                // value={formData.password}
                // onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                // error={errors.password}
                showPasswordToggle
              />
              {/* <PasswordStrength password={formData.password} /> */}
            </div>

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
            //   value={formData.confirmPassword}
            //   onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            //   error={errors.confirmPassword}
              showPasswordToggle
            />

            <Button type="submit" variant="primary" fullWidth>
              Create account
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-neutral-500">Or sign up with</span>
            </div>
          </div>

          {/* Social Signup */}
          <div className="space-y-3">
            <Button 
              type="button" 
              variant="social" 
              fullWidth
            >
              <Google />
              Sign up with Google
            </Button>

          </div>

          {/* Sign In Link */}
          <p className="text-center text-sm text-neutral-600 mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
  )
}

export default RegisterPage