import { useState, ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

interface SignupFormState {
  email: string
  password: string
  confirmPassword: string
  username: string
}

const SignupPage: React.FC = () => {
  const [formState, setFormState] = useState<SignupFormState>({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  })
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('https://localhost:7297/api/auth/login', {
        username,
        password
      })
      dispatch({ type: 'LOGIN', payload: response.data })
      return response
    } catch (error) {
      throw new Error('Login failed')
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError('')

    if (formState.password !== formState.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      const registerResponse = await axios.post('https://localhost:7297/api/auth/register', {
        username: formState.username,
        email: formState.email,
        password: formState.password,
        confirmPassword: formState.confirmPassword
      })

      if (registerResponse.status === 200) {
        try {
          await login(formState.username, formState.password)
          navigate('/dashboard')
        } catch (err) {
          setError('Failed to log in after registration. Please try logging in manually.')
        }
      } else {
        setError('Failed to sign up. Please check your details.')
      }
    } catch (err) {
      setError('Failed to sign up. Please check your details.')
    }
  }

  return (
<div className="flex h-screen w-full items-center overflow-auto md:items-start">
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

  <div className="flex h-full max-h-screen w-full flex-col items-center justify-between overflow-auto bg-black px-6 py-20 md:w-1/2 md:px-20 md:py-4">
    <h1 className="mx-auto w-full max-w-[500px] text-lg font-semibold text-white md:text-xl">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/68/Logo_FPT_Education.png"
        alt="FPT Education Logo"
      />
    </h1>

    <div className="flex w-full max-w-[500px] flex-col">
      <div className="mb-10 flex w-full flex-col">
        <h3 className="mb-2 text-4xl font-semibold text-white">Register</h3>
        <p className="mb-2 text-base text-white md:text-base">
          Welcome! Please enter your details.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex w-full flex-col">
          <input
            className="my-2 w-full border-b border-white bg-transparent py-2 pl-2 text-white outline-none focus:outline-none"
            type="text"
            name="username"
            placeholder="Username"
            value={formState.username}
            onChange={handleInputChange}
          />

          <input
            className="my-2 w-full border-b border-white bg-transparent py-2 pl-2 text-white outline-none focus:outline-none"
            type="email"
            name="email"
            placeholder="Email"
            value={formState.email}
            onChange={handleInputChange}
          />

          <input
            className="my-2 w-full border-b border-white bg-transparent py-2 pl-2 text-white outline-none focus:outline-none"
            type="password"
            name="password"
            placeholder="Password"
            value={formState.password}
            onChange={handleInputChange}
          />

          <input
            className="my-2 w-full border-b border-white bg-transparent py-2 pl-2 text-white outline-none focus:outline-none"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formState.confirmPassword}
            onChange={handleInputChange}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

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
        Already have an account?{' '}
        <span className="cursor-pointer font-semibold underline underline-offset-2">
          <Link to="/login">Login</Link>
        </span>
      </p>
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

export default SignupPage
