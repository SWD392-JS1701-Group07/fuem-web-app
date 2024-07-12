/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '@/constants/models/common'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import * as Dialog from '@radix-ui/react-dialog'
import * as Label from '@radix-ui/react-label'
import { Edit, Save } from 'lucide-react'
import { AVATAR_PLACEHOLDER_URL } from '@/constants/models/url'
import { Account } from '@/constants/models/Account'
import { formatDateTime } from '@/lib/utils'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'
import { useToast } from '@/components/ui/use-toast'
import { updateProfile } from '@/api/userAPI'

const profileFields = {
  name: 'Name',
  email: 'Email',
  username: 'Username',
  phoneNumber: 'Phone Number',
  dob: 'Date of Birth',
  gender: 'Gender',
  accountStatus: 'Account Status',
  studentId: 'Student ID',
  subjectId: 'Subject ID'
}

// Fields to exclude from the Edit Profile form
const excludeFromEdit = ['accountStatus', 'studentId', 'subjectId']

type ProfileFields = keyof typeof profileFields

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  username: yup.string().required('Username is required'),
  phoneNumber: yup
    .string()
    .matches(/^(0|\+84)[35789]\d{8}$/, 'Invalid Vietnamese phone number')
    .required('Phone number is required'),
  dob: yup
    .date()
    .required('Date of Birth is required')
    .nullable()
    .min(new Date(1900, 0, 1), 'Date of Birth cannot be before January 1, 1900')
    .max(new Date(), 'Date of Birth cannot be in the future'),
  gender: yup
    .string()
    .oneOf(['Male', 'Female', 'Others'], 'Invalid gender')
    .required('Gender is required'),
  subjectId: yup.string().required('Subject ID is required')
})

const ProfilePage: React.FC = () => {
  const { accessToken } = useSelector((state: AppState) => state.loginedUser)
  const [user, setUser] = useState<Account | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [formValues, setFormValues] = useState<Account | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const storedUser = localStorage.getItem('userProfile')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      setFormValues(parsedUser)
    }
  }, [accessToken])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target
    setFormValues((prevState) =>
      prevState
        ? {
            ...prevState,
            [name]: value
          }
        : null
    )
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEditMode(false)
    if (formValues) {
      try {
        await validationSchema.validate(formValues, { abortEarly: false })

        const formData = new FormData()
        formData.append('Name', formValues.name)
        formData.append('Email', formValues.email)
        formData.append('PhoneNumber', formValues.phoneNumber)
        formData.append('StudentId', formValues.studentId)
        formData.append('Dob', formValues.dob.toString())
        formData.append('Gender', formValues.gender)
        formData.append('SubjectId', formValues.subjectId.toString())
        if (avatarFile) {
          formData.append('avatarFile', avatarFile)
        }

        await updateProfile(formValues.id.toString(), formData, accessToken)
          .then((response) => {
            localStorage.setItem('userProfile', JSON.stringify(response.data))
            setUser(formValues)
            toast({
              title: 'Successfully updated!',
              description: 'Some changes might only be visible when you refresh the page',
              variant: 'default'
            })
          })
          .catch((error) => {
            toast({
              title: 'Failed to update profile',
              description: error.message,
              variant: 'destructive'
            })
          })
      } catch (error: any) {
        if (error instanceof yup.ValidationError) {
          error.inner.forEach((err) => {
            toast({
              title: 'Validation Error',
              description: err.message,
              variant: 'destructive'
            })
          })
        } else {
          toast({
            title: 'Failed to update profile',
            description: error.message,
            variant: 'destructive'
          })
        }
      }
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="mx-auto h-screen bg-black p-4 px-10 pt-10 text-white">
      <div className="flex items-center space-x-4">
        <Avatar className="h-40 w-40 rounded-full">
          <AvatarImage src={user.avatarUrl || AVATAR_PLACEHOLDER_URL} alt={user.name} />
          <AvatarFallback className="bg-gray-700 text-white">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <p className="text-xl text-gray-400">{user.email}</p>
        </div>
        <button
          className="flex items-center space-x-1 pl-4 text-xl text-blue-400 hover:text-blue-600"
          onClick={() => setEditMode(true)}
        >
          <Edit />
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-3xl font-semibold">Profile Details</h2>
        <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Object.entries(profileFields).map(([key, label]) => (
            <div key={key} className="flex flex-col">
              <Label.Root htmlFor={key} className="mb-1 font-medium text-gray-300">
                {label}
              </Label.Root>
              <input
                className="rounded border border-gray-700 bg-gray-800 p-2 text-white"
                type="text"
                id={key}
                name={key}
                value={
                  (key === 'dob'
                    ? formatDateTime(user[key as ProfileFields]?.toString(), 'date')
                    : user[key as ProfileFields] || '') as any
                }
                disabled
              />
            </div>
          ))}
        </form>
      </div>

      <Dialog.Root open={editMode} onOpenChange={setEditMode}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75" />
          <Dialog.Content className="fixed left-1/2 top-1/2 max-h-screen w-full max-w-lg -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded bg-gray-800 p-6 shadow-lg">
            <Dialog.Title className="text-2xl font-semibold text-white">Edit Profile</Dialog.Title>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {Object.entries(profileFields)
                .filter(([key]) => !excludeFromEdit.includes(key))
                .map(([key, label]) => (
                  <div key={key} className="flex flex-col">
                    <Label.Root htmlFor={key} className="mb-1 font-medium text-gray-300">
                      {label}
                    </Label.Root>
                    {key === 'dob' ? (
                      <input
                        className="rounded border border-gray-700 bg-gray-700 p-2 text-white"
                        type="date"
                        id={key}
                        name={key}
                        value={(formValues?.[key as ProfileFields] as any) || ''}
                        onChange={handleInputChange}
                      />
                    ) : key === 'gender' ? (
                      <select
                        className="rounded border border-gray-700 bg-gray-700 p-2 text-white"
                        id={key}
                        name={key}
                        value={(formValues?.[key as ProfileFields] as any) || ''}
                        onChange={handleInputChange}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                    ) : (
                      <input
                        className="rounded border border-gray-700 bg-gray-700 p-2 text-white"
                        type="text"
                        id={key}
                        name={key}
                        value={(formValues?.[key as ProfileFields] as any) || ''}
                        onChange={handleInputChange}
                      />
                    )}
                  </div>
                ))}
              <div className="flex flex-col">
                <Label.Root htmlFor="avatarFile" className="mb-1 font-medium text-gray-300">
                  Avatar
                </Label.Root>
                <input
                  className="rounded border border-gray-700 bg-gray-700 p-2 text-white"
                  type="file"
                  id="avatarFile"
                  name="avatarFile"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center space-x-1 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                >
                  <Save />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default ProfilePage
