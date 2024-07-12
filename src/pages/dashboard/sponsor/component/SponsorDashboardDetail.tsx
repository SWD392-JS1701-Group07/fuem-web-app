import { getById } from '@/api/sponsorApi'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Sponsor } from '@/constants/models/Sponsor'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Ellipsis } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SponsorDashboardDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [sponsor, setSponsor] = useState<Sponsor>()

  useEffect(() => {
    getById(id as string).then((res) => {
      return setSponsor(res.data)
    })
  }, [id])

  return (
    <div className="w-full">
      <div className="flex w-full justify-between bg-purple-400 p-3 text-gray-50">
        <div className="flex">
          <h1 className="text-5xl">{sponsor?.name}</h1>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Accordion type="multiple" defaultValue={['general']}>
        <AccordionItem title="staff Detail" value="general">
          <AccordionTrigger className="bg-slate-200 pl-2">General information</AccordionTrigger>
          <AccordionContent>
            <Card className="pt-2 text-lg">
              <CardContent>Staff Name: {sponsor?.name}</CardContent>
              <CardContent>Email: {sponsor?.email}</CardContent>
              <CardContent>Phone Number: {sponsor?.phoneNumber}</CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default SponsorDashboardDetail
