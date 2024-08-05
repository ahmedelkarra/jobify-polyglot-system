'use client'
import { comapnyDeleteProfile, companyProfileState, companySubmitProfile } from '@/redux/companyProfileSlice'
import { AppDispatch, RootState } from '@/redux/store'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'



function CompanyProfileComponent() {
  const [valueInputs, setValueInputs] = useState<companyProfileState>({
    owner_first_name: "",
    owner_last_name: "",
    email: "",
    username: "",
    company_name: '',
    website: '',
    password: "",
    new_password: "",
    confirm_new_password: ""
  })
  const selector = useSelector((state: RootState) => state.company)
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(companySubmitProfile(valueInputs))
  }

  const handleClick = () => {
    dispatch(comapnyDeleteProfile())
  }
  useEffect(() => {
    setValueInputs({
      ...valueInputs,
      owner_first_name: selector?.owner_first_name,
      owner_last_name: selector?.owner_last_name,
      email: selector?.email,
      username: selector?.username,
      company_name: selector?.company_name,
      website: selector?.website,
    })
  }, [selector])
  return selector?.username && (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">

        <form onSubmit={handleSubmit} className="mb-12 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <p className="text-center text-lg font-medium">Change your information</p>

          <div>
            <label htmlFor="owner_first_name" className="sr-only"> owner first name</label>

            <div className="relative">
              <input
                onChange={(e) => setValueInputs({ ...valueInputs, owner_first_name: e.target.value })}
                value={valueInputs?.owner_first_name}
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Owner First Name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="owner_last_name" className="sr-only">Owner last name</label>

            <div className="relative">
              <input
                onChange={(e) => setValueInputs({ ...valueInputs, owner_last_name: e.target.value })}
                value={valueInputs?.owner_last_name}
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Owner Last Name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className="sr-only">Username</label>

            <div className="relative">
              <input
                onChange={(e) => setValueInputs({ ...valueInputs, username: e.target.value })}
                value={valueInputs?.username}
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Username"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">Email</label>

            <div className="relative">
              <input
                onChange={(e) => setValueInputs({ ...valueInputs, email: e.target.value })}
                value={valueInputs?.email}
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password</label>

            <div className="relative">
              <input
                onChange={(e) => setValueInputs({ ...valueInputs, password: e.target.value })}
                value={valueInputs?.password}
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Your Password"
              />

            </div>
          </div>

          <div>
            <label htmlFor="new_password" className="sr-only">new Password</label>

            <div className="relative">
              <input
                onChange={(e) => setValueInputs({ ...valueInputs, new_password: e.target.value })}
                value={valueInputs?.new_password}
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="New Password"
              />

            </div>
          </div>

          <div>
            <label htmlFor="New_Confilrm_Password" className="sr-only">New Confilrm Password</label>

            <div className="relative">
              <input
                onChange={(e) => setValueInputs({ ...valueInputs, confirm_new_password: e.target.value })}
                value={valueInputs?.confirm_new_password}
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="New Confilrm Password"
              />

            </div>
          </div>
          <div className='flex gap-1'>
            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Submit
            </button>
            <button
              onClick={handleClick}
              className="block w-full rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white"
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CompanyProfileComponent