import { useState, ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebaseConfig'

interface SignupFormState {
  email: string
  password: string
  confirmPassword: string
}

const SignupPage: React.FC = () => {
  const [formState, setFormState] = useState<SignupFormState>({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  /**
   * Updates the form state with the new input value.
   *
   * @param {ChangeEvent<HTMLInputElement>} e - The event object containing the new input value.
   * @return {void}
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  /**
   * Handles the form submission for the signup page.
   *
   * @param {FormEvent<HTMLFormElement>} e - The form event triggered by the submit button.
   * @return {Promise<void>} A promise that resolves when the submission is complete.
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError('')

    if (formState.password !== formState.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, formState.email, formState.password)
      navigate('/')
    } catch (err) {
      setError('Failed to sign up. Please check your details.')
    }
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
            <h3 className="mb-2 text-4xl font-semibold text-white">Register</h3>
            <p className="mb-2 text-base text-white md:text-base">
              Welcome! Please enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex w-full flex-col">
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
      </div>
    </div>
  )
}

export default SignupPage
