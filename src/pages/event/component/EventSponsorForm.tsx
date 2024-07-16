import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import { DialogHeader, DialogFooter } from '@/components/ui/dialog'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogClose
} from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { Event } from '@/constants/models/Event'
import { Account } from '@/constants/models/Account'
import { Sponsor } from '@/constants/models/Sponsor'
import { getSponsorByEmail } from '@/api/sponsorApi'

const EventSponsorForm = ({ event }: { event: Event }) => {
  const [sponsor, setSponsor] = useState<Sponsor>()
  const getAccountEmail = () => {
    const userProfile = localStorage.getItem('userProfile')
    if (userProfile) {
      const parsedProfile: Account = JSON.parse(userProfile)
      return parsedProfile.email
    }
    return null
  }

  useEffect(() => {
    getSponsorByEmail(getAccountEmail() as string)
      .then((response) => {
        console.log('SPONSOR: ', response)
        setSponsor(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const [formData, setFormData] = useState({
    description: '',
    title: '',
    sum: '',
    sponsorId: sponsor?.accountId || null,
    eventId: event.id
  })

  const { toast } = useToast()

  const validationSchema = Yup.object({
    description: Yup.string()
      .min(5, 'Description must be at least 5 characters long')
      .max(255, 'Description cannot be longer than 255 characters')
      .required('Description is required'),
    title: Yup.string()
      .min(3, 'Title must be at least 3 characters long')
      .max(50, 'Title cannot be longer than 50 characters')
      .required('Title is required'),
    sum: Yup.number().min(1000, 'Sum must be at least 1,000 VND').required('Sum is required')
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      await validationSchema.validate(formData)
      await axios.post('/api/sponsorships', formData)
      toast({
        title: 'Success',
        description: 'Sponsorship provided successfully',
        variant: 'default'
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        toast({
          title: 'Validation Error',
          description: error.message,
          variant: 'destructive'
        })
      } else {
        toast({
          title: 'Error',
          description: 'There was an error providing sponsorship',
          variant: 'destructive'
        })
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-2 h-14 rounded-none border border-crayola bg-black px-8 text-xl text-crayola hover:bg-crayola hover:text-black">
          Provide Sponsorship
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black text-white">
        <DialogHeader>Provide Sponsorship</DialogHeader>
        <DialogDescription>Please fill out the form below:</DialogDescription>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-white" htmlFor="description">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="w-full border border-white bg-black p-2 text-white"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-white" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full border border-white bg-black p-2 text-white"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-white" htmlFor="sum">
              Sum
            </label>
            <input
              type="number"
              id="sum"
              name="sum"
              className="w-full border border-white bg-black p-2 text-white"
              value={formData.sum}
              onChange={handleInputChange}
              required
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" variant="outline" className="text-black">
                Submit
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="outline" className="text-black">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EventSponsorForm
