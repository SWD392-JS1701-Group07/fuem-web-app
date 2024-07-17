import { useEffect, useState } from 'react'
import * as Label from '@radix-ui/react-label'
import { useParams } from 'react-router-dom'
import { Sponsorships } from '@/constants/models/Event'
import { deleteSponsorship, editSponsorship, getSponsorshipsById } from '@/api/sponsorApi'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'

const SponsorshipEdit = () => {
  const { id } = useParams<{ id: string }>()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<Sponsorships>({
    id: 0,
    title: '',
    description: '',
    sum: '0',
    sponsorId: 0,
    eventId: 0
  } as Sponsorships)
  useEffect(() => {
    const fetchSponsorship = async () => {
      const response = await getSponsorshipsById(parseInt(id as string))
      const data: Sponsorships = response.data
      setFormData(data)
    }

    fetchSponsorship()
  }, [id])

  const handleDelete = async (id: number) => {
    await deleteSponsorship(id)
      .then(() => {
        toast({
          title: 'Success',
          description: 'Sponsorship deleted successfully',
          variant: 'default'
        })
        setTimeout(() => {
          navigate('/dashboard/sponsorship')
        }, 500)
      })
      .catch((error) => {
        toast({
          title: 'Error',
          description: 'Failed to delete sponsorship. Error: ' + error,
          variant: 'destructive'
        })
      })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await editSponsorship(formData)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        if (response.isSuccess) {
          toast({
            title: 'Success',
            description: 'Sponsorship updated successfully',
            variant: 'default'
          })
          setTimeout(() => {
            navigate(`/dashboard/sponsorship/${formData.id}`)
          }, 500)
        } else {
          toast({
            title: 'Error',
            description: 'Failed to update sponsorship. Please check your input',
            variant: 'destructive'
          })
        }
      })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...(formData as Sponsorships), [name]: value })
  }

  return (
    <div className="w-1/2 p-4">
      <h1 className="mb-5 flex flex-row justify-between text-4xl font-semibold">
        Edit Sponsorship
        <button
          type="submit"
          className="flex items-center space-x-1 rounded bg-red-400 px-4 py-2 text-lg font-normal text-white hover:bg-red-700"
          onClick={() => handleDelete(parseInt(id as string))}
        >
          Delete Sponsorship
        </button>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label.Root htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </Label.Root>
          <input
            type="text"
            name="title"
            id="title"
            value={formData?.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
          />
        </div>
        <div className="mb-4">
          <Label.Root htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </Label.Root>
          <input
            type="text"
            name="description"
            id="description"
            value={formData?.description}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
          />
        </div>
        <div className="mb-4">
          <Label.Root htmlFor="sum" className="block text-sm font-medium text-gray-700">
            Sum
          </Label.Root>
          <input
            type="number"
            name="sum"
            id="sum"
            value={formData?.sum}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
          />
        </div>
        <div className="flex justify-start">
          <button
            type="submit"
            className="flex items-center space-x-1 rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default SponsorshipEdit