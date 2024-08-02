import React from 'react'

function ProfileComponent() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">

        <form action="#" className="mb-12 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <p className="text-center text-lg font-medium">Change your information</p>

          <div>
            <label htmlFor="first_name" className="sr-only">first name</label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="First Name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="last_name" className="sr-only">last name</label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className="sr-only">Username</label>

            <div className="relative">
              <input
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
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="New Confilrm Password"
              />

            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfileComponent