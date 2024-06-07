import { Link } from 'react-router-dom'

const SignupPage = () => {
  return (
    <div className="flex h-screen w-full items-start">
      <div className="relative hidden h-full w-1/2 flex-col md:flex">
        <div className="absolute left-[10%] top-[20%] flex flex-col">
          <h1 className="my-4 text-center text-6xl font-bold text-white">
            Join Any Event You Want!
          </h1>
          <p className="text-center text-2xl font-normal text-white">
            FPT University is here to support you
          </p>
        </div>
        <img
          src="src/assets/auth-bg.jpg"
          className="-z-10 h-full w-full object-cover object-left"
        />
      </div>

      <div className="flex h-full w-full flex-col items-center justify-between bg-black p-20 md:w-1/2">
        <h1 className="mx-auto w-full max-w-[500px] text-lg font-semibold text-white md:text-xl">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/68/Logo_FPT_Education.png" />
        </h1>

        <div className="flex w-full max-w-[500px] flex-col">
          <div className="mb-10 flex w-full flex-col">
            <h3 className="mb-2 text-4xl font-semibold text-white">Register</h3>
            <p className="mb-2 text-base text-white md:text-base">
              Welcome! Please enter your details.
            </p>
          </div>

          <form>
            <div className="flex w-full flex-col">
              <input
                className="my-2 w-full border-b border-white bg-transparent py-2 pl-2 text-white outline-none focus:outline-none"
                type="email"
                name="email"
                placeholder="Email"
                // {...register('email', {
                //   required: 'You must specify an email.',
                //   pattern: {
                //     value: /\S+@\S+\.\S+/,
                //     message: 'Invalid email format.'
                //   }
                // })}
              />
              {/* {errors?.email && (
                <p className='p-1 text-[13px] font-normal text-red-500 '>
                  {errors?.email?.message}
                </p>
              )} */}

              <input
                className="my-2 w-full border-b border-white bg-transparent py-2 pl-2 text-white outline-none focus:outline-none"
                type="password"
                name="password"
                placeholder="Password"
                // {...register('password', {
                //   required: 'You must specify a password',
                //   pattern: {
                //     value: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/,
                //     message:
                //       'Password must contain at least one lower character, one upper character, digit or special symbol'
                //   }
                // })}
              />
              {/* {errors?.password && (
                <p className='p-1 text-[13px] font-normal text-red-500 '>
                  {errors?.password?.message}
                </p>
              )} */}

              <input
                className="my-2 w-full border-b border-white bg-transparent py-2 pl-2 text-white outline-none focus:outline-none"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                // {...register('confirmPassword', {
                //   required: 'You must specify a confirm password',
                //   validate: (value) =>
                //     value === watch('password') || 'The passwords do not match'
                // })}
              />
              {/* {errors?.confirmPassword && (
                <p className='p-1 text-[13px] font-normal text-red-500 '>
                  {errors?.confirmPassword?.message}
                </p>
              )}
              {activateMess && (
                <p>
                  {activateMess}{' '}
                  <span
                    className='font-semibold underline underline-offset-2 cursor-pointer'
                    onClick={handleResendRequest}
                  >
                    Resend Email
                  </span>
                </p>
              )} */}
            </div>

            <div className="my-4 flex w-full flex-col">
              <button
                type="submit"
                className="my-2 flex w-full cursor-pointer items-center justify-center rounded-md bg-white p-2 text-center font-semibold text-black md:p-4"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>

        <div className="flex w-full items-center justify-center">
          <p className="text-sm font-normal text-white">
            Already have account?{' '}
            <span className="cursor-pointer font-semibold underline underline-offset-2">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
