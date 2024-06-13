import { useState, ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '@/api/userAPI'
import { useDispatch, useSelector } from 'react-redux'

interface LoginFormState {
  username: string
  password: string
}

const LoginPage = () => {
  const loginedUser = useSelector((state: any) => state.loginedUser)
  const dispatch = useDispatch();
  const [formState, setFormState] = useState<LoginFormState>({ username: '', password: '' })
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError('')
    login(formState).then((response) => {
      dispatch({ type: 'LOGIN', payload: response });
    }).catch((error) => { console.log(error) }).finally(() => { navigate('/dashboard') });
    //   try {
    //     await signInWithEmailAndPassword(auth, formState.email, formState.password)
    //     navigate('/dashboard')
    //   } catch (err) {
    //     setError('Failed to log in. Please check your credentials.')
    //   }
    // if (formState.username === "operator" && formState.password === "123456") {
    //   navigate("/dashboard");
    // } else if ((formState.username === "visitor" && formState.password === "123456")) {
    //   navigate("/");
    // } else {
    //   setError('Failed to log in. Please check your credentials.')
    // }
  }
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
          alt="Background"
        />
      </div>

      <div className="flex h-full w-full flex-col items-center justify-between bg-black p-20 md:w-1/2">
        <h1 className="mx-auto w-full max-w-[500px] text-lg font-semibold text-white md:text-xl">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/68/Logo_FPT_Education.png"
            alt="FPT Education Logo"
          />
        </h1>

        <div className="flex w-full max-w-[500px] flex-col">
          <div className="mb-10 flex w-full flex-col">
            <h3 className="mb-2 text-4xl font-semibold text-white">Login</h3>
            <p className="mb-2 text-base text-white md:text-base">
              Welcome Back! Please enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex w-full flex-col">
              <input
                className="my-2 w-full border-b border-white bg-transparent py-2 pl-2 text-white outline-none focus:outline-none"
                type="text"
                placeholder="username"
                name="username"
                value={formState.username}
                onChange={handleInputChange}
              />

              <input
                className="my-2 w-full border-b border-white bg-transparent py-2 pl-2 text-white outline-none focus:outline-none"
                type="password"
                placeholder="Password"
                name="password"
                value={formState.password}
                onChange={handleInputChange}
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

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
