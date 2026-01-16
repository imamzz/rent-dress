"use client";
// import { Alert } from "@/src/components/molecules/Alert";
import { Button } from "@/src/components/molecules/Button";
import { Input } from "@/src/components/molecules/Input";
import Google from "@/src/components/icons/Google";
import Link from "next/link";
import { useActionState } from "react";
import { login } from "./actions";
import { useFormStatus } from "react-dom";

const LoginPage = () => {
  const [state, loginAction] = useActionState(login, undefined);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl mb-2">Welcome back</h1>
        <p className="text-neutral-600">Sign in to your account to continue</p>
      </div>

      {state?.errors && (
        <div className="mb-6">
          {/* <Alert type="error" message={state.errors.email} /> */}
        </div>
      )}

      <form action={loginAction} className="space-y-4">
        <Input
          label="Email or Username"
          type="text"
          placeholder="Enter your email or username"
          name="email"
          error={state?.errors?.email?.[0]}
          // value={formData.email}
          // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          name="password"
          error={state?.errors?.password?.[0]}
          showPasswordToggle
          // value={formData.password}
          // onChange={(e) => setFormData({ ...formData, password: e.target.value }) }
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              //   checked={rememberMe}
              //   onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
            />
            <span className="text-sm text-neutral-700">Remember me</span>
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Forgot password?
          </Link>
        </div>

        <SubmitButton />
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-neutral-500">
            Or continue with
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Button type="button" variant="social" fullWidth>
          <Google />
          Sign in with Google
        </Button>
      </div>

      <p className="text-center text-sm text-neutral-600 mt-6">
        Don&#39;t have an account?{" "}
        <Link
          href="/auth/register"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit" className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-4 focus:ring-blue-500/20">
      Login
    </button>
  );
}

export default LoginPage;
