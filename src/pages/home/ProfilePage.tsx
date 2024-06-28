/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '@/constants/models/common'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import * as Dialog from '@radix-ui/react-dialog'
import * as Label from '@radix-ui/react-label'
import { Edit, Save } from 'lucide-react'
import { AVATAR_PLACEHOLDER_URL } from '@/constants/models/url'
import { getById } from '@/api/accountApi'
import { Account } from '@/constants/models/Account'
import { formatDateTime } from '@/lib/utils'

const profileFields = {
  name: 'Name',
  email: 'Email',
  username: 'Username',
  phoneNumber: 'Phone Number',
  dob: 'Date of Birth',
  gender: 'Gender',
  accountStatus: 'Account Status',
  studentId: 'Student ID',
  subjectId: 'Subject ID',
}

// Fields to exclude from the Edit Profile form
const excludeFromEdit = ['accountStatus', 'studentId', 'subjectId']

const ProfilePage: React.FC = () => {
  const { accessToken } = useSelector((state: AppState) => state.loginedUser)
  const [user, setUser] = useState<Account | null>(null)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (accessToken && userId) {
      getById(userId)
        .then((profile) => setUser(profile))
        .catch((err) => console.error('Failed to fetch user profile:', err))
    }
  }, [accessToken])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setUser((prevState) =>
      prevState
        ? {
            ...prevState,
            [name]: value,
          }
        : null
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setEditMode(false)
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
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                value={key === 'dob' ? formatDateTime(user[key].toString(), 'date') : (user as any)[key] || ''}
                onChange={handleInputChange}
                disabled={!editMode}
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
                    <input
                      className="rounded border border-gray-700 bg-gray-700 p-2 text-white"
                      type="text"
                      id={key}
                      name={key}
                      value={key === 'dob' ? formatDateTime(user[key].toString(), 'date') : (user as any)[key] || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
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
