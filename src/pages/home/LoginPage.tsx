import { Link } from 'react-router-dom'

const LoginPage = () => {
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
            <h3 className="mb-2 text-4xl font-semibold text-white">Login</h3>
            <p className="mb-2 text-base text-white md:text-base">
              Welcome Back! Please enter your details.
            </p>
          </div>

          <form>
            <div className="flex w-full flex-col">
              <input
                className="my-2 w-full border-b border-white bg-transparent py-2 pl-2 text-white outline-none focus:outline-none"
                type="text"
                placeholder="Username"
                name="username"
                // {...register('username', {
                //   required: 'You must specify username.'
                // })}
              />
              {/* {errors?.username && (
                    <p className='p-1 text-[13px] font-normal text-red-500 '>
                      {errors?.username?.message}
                    </p>
                  )} */}

              <input
                className="my-2 w-full border-b border-white bg-transparent py-2 pl-2 text-white outline-none focus:outline-none"
                type="password"
                placeholder="Password"
                name="password"
                // {...register('password', {
                //   required: 'You must specify password'
                // })}
              />
              {/* {errors?.password && (
                    <p className='p-1 text-[13px] font-normal text-red-500 '>
                      {errors?.password?.message}
                    </p>
                  )} */}
            </div>

            <div className="w-full items-center justify-between md:flex">
              {/* <div className='w-full md:flex hidden'>
                    <input type='checkbox' className='w-4 h-4 mr-2' />
                    <p className='text-sm'>Remember Me</p>
                  </div> */}

              {/* <p className='text-sm font-medium cursor-pointer blackspace-nowrap underline underline-offset-2'>
                    <Link to={PATH.FORGET_PASSWORD}>Forgot Password?</Link>
                  </p> */}
            </div>

            <div className="my-4 flex w-full flex-col">
              <button
                type="submit"
                className="my-2 flex w-full cursor-pointer items-center justify-center rounded-md bg-white p-2 text-center font-semibold text-black md:p-4"
              >
                Log in
              </button>

              <div className="relative flex w-full items-center justify-center py-2">
                <div className="h-[1px] w-full bg-white/40"></div>
                <p className="bg-background absolute my-2 text-lg text-white/80"> or </p>
              </div>
              <p className="mb-2 mt-5 text-center text-base text-white underline md:text-base">
                <Link to="/signup">Click here to Sign up </Link>
              </p>
              {/*     
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    render={(renderProps) => (
                      <div
                        className='w-full my-2 font-semibold text-white bg-black border-2 border-white rounded-md p-2 md:p-4 text-center flex items-center justify-center cursor-pointer'
                        onClick={signIn}
                      >
                        <img src={GOOGLE_ICON} className='h-6 mr-2' />
                        Sign In With Google
                      </div>
                    )}
                    onSuccess={onSuccess}
                    // onFailure={googleFailure}
                    cookiePolicy='single_host_origin'
                  /> */}
            </div>
          </form>
        </div>

        <div className="flex w-full items-center justify-center">
          <p className="text-xs font-normal text-white md:text-sm">
            <span className="cursor-pointer font-semibold underline underline-offset-2">
              <Link to="/">Back to home</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
