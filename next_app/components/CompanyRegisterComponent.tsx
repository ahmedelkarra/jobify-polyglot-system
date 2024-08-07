'use client'
import React, { useState } from 'react'
import logo from '@/public/logo.svg'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { companyRegisterState, companySubmitRegister } from '@/redux/companyRegisterSlice'
import HeaderRegister from './HeaderRegister'
import HandleSuccess from './HandleSuccess'
import HandleError from './HandleError'
import { clearMessages } from '@/redux/messageSlice'



function CompanyRegisterComponent() {
  const [valueInputs, setValueInputs] = useState<companyRegisterState>({
    owner_first_name: "",
    owner_last_name: "",
    email: "",
    username: "",
    company_name: '',
    website: '',
    password: "",
    confirm_password: ""
  })
  const dispatch = useDispatch<AppDispatch>()
  const selector = useSelector((state: RootState) => state.me)
  const successMessage = useSelector((state: RootState) => state?.message?.successMessage)
  const errorMessage = useSelector((state: RootState) => state?.message?.errorMessage)

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(companySubmitRegister(valueInputs))
  }
  return !selector?.username && (
    <section className="bg-white my-5">
      <HeaderRegister />
      <HandleSuccess successMessage={successMessage} />
      <HandleError errorMessage={errorMessage}/>
      <div className="lg:grid lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <span className="sr-only">Home</span>
            <img src={logo.src} alt="logo" className='h-32' />

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to Jobify
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Join Jobify now and unlock the doors to your dream job! Discover exciting career opportunities,
              connect with top employers, and start your path to success today.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                  Owner First Name
                </label>

                <input
                  onChange={(e) => setValueInputs({ ...valueInputs, owner_first_name: e.target.value })}
                  type="text"
                  id="owner_first_name"
                  name="owner_first_name"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-1"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="owner_last_name" className="block text-sm font-medium text-gray-700">
                  Owner Last Name
                </label>

                <input
                  onChange={(e) => setValueInputs({ ...valueInputs, owner_last_name: e.target.value })}
                  type="text"
                  id="owner_last_name"
                  name="owner_last_name"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-1"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="Username" className="block text-sm font-medium text-gray-700"> Username </label>

                <input
                  onChange={(e) => setValueInputs({ ...valueInputs, username: e.target.value })}
                  type="text"
                  id="Username"
                  name="username"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-1"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

                <input
                  onChange={(e) => setValueInputs({ ...valueInputs, email: e.target.value })}
                  type="email"
                  id="Email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-1"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="Company-Name" className="block text-sm font-medium text-gray-700"> Company Name </label>

                <input
                  onChange={(e) => setValueInputs({ ...valueInputs, company_name: e.target.value })}
                  type="text"
                  id="Company-Name"
                  name="Company Name"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-1"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="Website" className="block text-sm font-medium text-gray-700"> Website </label>

                <input
                  onChange={(e) => setValueInputs({ ...valueInputs, website: e.target.value })}
                  type="text"
                  id="Website"
                  name="Website"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-1"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

                <input
                  onChange={(e) => setValueInputs({ ...valueInputs, password: e.target.value })}
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-1"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                  Password Confirmation
                </label>

                <input
                  onChange={(e) => setValueInputs({ ...valueInputs, confirm_password: e.target.value })}
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-1"
                />
              </div>


              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  By creating an account, you agree to our
                  <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                  and
                  <a href="#" className="text-gray-700 underline">privacy policy</a>.
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <a href="#" className="text-gray-700 underline">Log in</a>.
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  )
}

export default CompanyRegisterComponent