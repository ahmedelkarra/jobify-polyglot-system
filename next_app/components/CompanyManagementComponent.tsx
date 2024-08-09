'use client'
import { AppDispatch, RootState } from '@/redux/store'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import HandleSuccess from './HandleSuccess'
import HandleError from './HandleError'
import { useDispatch } from 'react-redux'

function CompanyManagementComponent() {
  const [valueInputs, setValueInputs] = useState({ title: "", body: "" });
  const successMessage = useSelector((state: RootState) => state?.message?.successMessage)
  const errorMessage = useSelector((state: RootState) => state?.message?.errorMessage)
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const selector = useSelector((state: RootState) => state?.company)
  return selector?.username && (
    <div className="mx-auto my-16 max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-lg min-h-[100dvh] md:min-h-1">
      <HandleSuccess successMessage={successMessage} />
      <HandleError errorMessage={errorMessage} />
      <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">For Company</h1>
      <form onSubmit={handleSubmit} className="mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
        <p className="text-center text-lg font-medium">Add job to share</p>

        <div>

          <div className="relative">
            <input
              onChange={(e) => setValueInputs({ ...valueInputs, title: e.target.value })}
              type="text"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter Title"
            />

          </div>
        </div>

        <div>
          <div className="relative">
            <textarea
              onChange={(e) => setValueInputs({ ...valueInputs, body: e.target.value })}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter Body"
            />

          </div>
        </div>

        <button
          type="submit"
          className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        >
          ADD JOB
        </button>
      </form>
    </div>
  </div>
  )
}

export default CompanyManagementComponent