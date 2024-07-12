import { getById } from '@/api/accountApi'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Account } from '@/constants/models/Account'
import { formatDateTime } from '@/lib/utils'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Ellipsis } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const OperatorDashboardDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [operator, setOperator] = useState<Account>()
  const [color, setColor] = useState('gray-500')

  useEffect(() => {
    getById(id as string).then((res) => {
      return setOperator(res)
    })
  }, [id])

  useEffect(() => {
    if (operator?.accountStatus === 'Active') {
      setColor('green-500')
    } else if (operator?.accountStatus === 'Banned') {
      setColor('red-500')
    } else {
      setColor('gray-500')
    }
  }, [operator])

  return (
    <div className="w-full">
      <div className="flex w-full justify-between bg-purple-400 p-3 text-gray-50">
        <div className="flex">
          <h1 className="text-5xl">{operator?.name}</h1>
          <Button
            className={`border-4 border-${color} bg-white text-${color} m-0 rounded-3xl p-0 px-2`}
          >
            {operator?.accountStatus}
          </Button>
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
        <AccordionItem title="Operator Detail" value="general">
          <AccordionTrigger className="bg-slate-200 pl-2">General information</AccordionTrigger>
          <AccordionContent>
            <Card className="pt-2 text-lg">
              <CardContent>Operator Name: {operator?.name}</CardContent>
              <CardContent>Email: {operator?.email}</CardContent>
              <CardContent>Username: {operator?.username}</CardContent>
              <CardContent>Phone Number: {operator?.phoneNumber}</CardContent>
              <CardContent>
                Date of Birth: {formatDateTime(operator?.dob.toString() as string, 'date')}
              </CardContent>
              <CardContent>Gender: {operator?.gender}</CardContent>
              <CardContent>Account Status: {operator?.accountStatus}</CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default OperatorDashboardDetail
