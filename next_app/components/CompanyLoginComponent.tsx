'use client'
import { submitLoginCompany } from '@/redux/companyLoginSlice';
import { RootState, AppDispatch } from '@/redux/store';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderLogin from './HeaderLogin';
import HandleError from './HandleError';
import HandleSuccess from './HandleSuccess';

function CompanyLoginComponent() {
  const selectorMe = useSelector((state: RootState) => state?.me)
  const selectorComapny = useSelector((state: RootState) => state?.company)
  const [valueInputs, setValueInputs] = useState({ username: "", password: "" });
  const successMessage = useSelector((state: RootState) => state?.message?.successMessage)
  const errorMessage = useSelector((state: RootState) => state?.message?.errorMessage)
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(submitLoginCompany(valueInputs));
  };

  return !(selectorMe.username || selectorComapny?.username) && (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg min-h-[100dvh] md:min-h-1">
        <HeaderLogin />
        <HandleSuccess successMessage={successMessage} />
        <HandleError errorMessage={errorMessage} />
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Get started</h1>
        <form onSubmit={handleSubmit} className="mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <p className="text-center text-lg font-medium">Sign in as a Company</p>

          <div>
            <label htmlFor="username" className="sr-only">Username</label>

            <div className="relative">
              <input
                onChange={(e) => setValueInputs({ ...valueInputs, username: e.target.value })}
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Username"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password</label>

            <div className="relative">
              <input
                onChange={(e) => setValueInputs({ ...valueInputs, password: e.target.value })}
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Password"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>

          <p className="text-center text-sm text-gray-500">
            No account?
            <Link className="underline" href="/register">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CompanyLoginComponent;
