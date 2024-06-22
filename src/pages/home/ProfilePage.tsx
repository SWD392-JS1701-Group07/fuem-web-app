/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import * as Dialog from '@radix-ui/react-dialog'
import * as Label from '@radix-ui/react-label'
import { Edit, Save } from 'lucide-react'
import { AVATAR_PLACEHOLDER_URL } from '@/constants/models/url'

interface UserProfile {
  Name: string
  Email: string
  Username: string
  PhoneNumber: string
  DOB: string
  Gender: string
  AvatarUrl: string
  AccountStatus: string
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    Name: 'John Doe',
    Email: 'johndoe@example.com',
    Username: 'johnny',
    PhoneNumber: '123-456-7890',
    DOB: '1990-01-01',
    Gender: 'Male',
    AvatarUrl: AVATAR_PLACEHOLDER_URL,
    AccountStatus: 'Active'
  })

  const [editMode, setEditMode] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setEditMode(false)
  }

  return (
    <div className="mx-auto h-screen bg-black p-4 px-10 pt-10 text-white">
      <div className="flex items-center space-x-4">
        <Avatar className="h-40 w-40 rounded-full">
          <AvatarImage src={user.AvatarUrl} alt={user.Name} />
          <AvatarFallback className="bg-gray-700 text-white">{user.Name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-bold">{user.Name}</h1>
          <p className="text-xl text-gray-400">{user.Email}</p>
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
          {['Name', 'Email', 'Username', 'PhoneNumber', 'DOB', 'Gender', 'AccountStatus'].map(
            (key) => (
              <div key={key} className="flex flex-col">
                <Label.Root htmlFor={key} className="mb-1 font-medium text-gray-300">
                  {key}
                </Label.Root>
                <input
                  className="rounded border border-gray-700 bg-gray-800 p-2 text-white"
                  type="text"
                  id={key}
                  name={key}
                  value={(user as any)[key]}
                  onChange={handleInputChange}
                  disabled={true}
                />
              </div>
            )
          )}
        </form>
      </div>

      <Dialog.Root open={editMode} onOpenChange={setEditMode}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75" />
          <Dialog.Content className="fixed left-1/2 top-1/2 max-h-screen w-full max-w-lg -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded bg-gray-800 p-6 shadow-lg">
            <Dialog.Title className="text-2xl font-semibold text-white">Edit Profile</Dialog.Title>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {['Name', 'Email', 'Username', 'PhoneNumber', 'DOB', 'Gender', 'AccountStatus'].map(
                (key) => (
                  <div key={key} className="flex flex-col">
                    <Label.Root htmlFor={key} className="mb-1 font-medium text-gray-300">
                      {key}
                    </Label.Root>
                    <input
                      className="rounded border border-gray-700 bg-gray-700 p-2 text-white"
                      type="text"
                      id={key}
                      name={key}
                      value={(user as any)[key]}
                      onChange={handleInputChange}
                    />
                  </div>
                )
              )}
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
