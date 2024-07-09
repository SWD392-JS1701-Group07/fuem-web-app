import { useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getAll } from '@/api/eventApi'
import EventCalendar from './component/EventCalendar'
import { Event } from '@/constants/models/Event'
import { Separator } from '@/components/ui/separator'
import EventCard from './component/EventCard'
import EventTable from './component/EventTable'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Calendar, List, WalletCards } from 'lucide-react'

const EventList = () => {
  const cardsPerPage = 12
  const [data, setData] = useState<Event[]>([])
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(cardsPerPage)
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState('Newest')
  const [selectedTab, setSelectedTab] = useState('card')

  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = async () => {
    try {
      const response = await getAll()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      setData(response)
      console.log('data: ', response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  const sortData = (data: Event[]) => {
    switch (sortOrder) {
      case 'Newest':
        return data.sort(
          (a, b) => new Date(b.startSellDate).getTime() - new Date(a.startSellDate).getTime()
        )
      case 'Oldest':
        return data.sort(
          (a, b) => new Date(a.startSellDate).getTime() - new Date(b.startSellDate).getTime()
        )
      case 'Price Asc':
        return data.sort((a, b) => a.price - b.price)
      case 'Price Desc':
        return data.sort((a, b) => b.price - a.price)
      default:
        return data
    }
  }

  const sortedData = sortData(data)

  return (
    <div className="dark w-full bg-black px-16 pb-10 text-white">
      <h1 className="mx-auto w-full py-8 font-jura text-6xl font-semibold">Events</h1>
      <Tabs defaultValue="card" onValueChange={(value) => setSelectedTab(value)} className="">
        <TabsList className="grid h-auto w-full grid-cols-3">
          <TabsTrigger value="list">
            <div className="flex flex-row items-center justify-center">
              List <List className="ml-2" />
            </div>
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <div className="flex flex-row items-center justify-center">
              Calendar <Calendar className="ml-2" />
            </div>
          </TabsTrigger>
          <TabsTrigger value="card">
            <div className="flex flex-row items-center justify-center">
              Card <WalletCards className="ml-2" />
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="card">
          <div className="flex justify-start pb-4">
            {selectedTab === 'card' && (
              <div className="z-10 flex justify-start pb-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="inline-flex items-center justify-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800">
                      Sort by: {sortOrder}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-2 w-56 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {['Newest', 'Oldest', 'Price Asc', 'Price Desc'].map((order) => (
                      <DropdownMenuItem
                        key={order}
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                        onClick={() => setSortOrder(order)}
                      >
                        {order}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
          {!loading && sortedData.length > 0 ? (
            <div className="flex flex-wrap">
              {sortedData.slice(startIndex, endIndex).map((event) => (
                <EventCard key={event.id as React.Key} event={event} />
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <div className="mt-5">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={startIndex === 0 ? 'pointer-events-none opacity-50' : undefined}
                    onClick={() => {
                      setStartIndex(startIndex - cardsPerPage)
                      setEndIndex(endIndex - cardsPerPage)
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className={
                      endIndex >= sortedData.length ? 'pointer-events-none opacity-50' : undefined
                    }
                    onClick={() => {
                      setStartIndex(startIndex + cardsPerPage)
                      setEndIndex(endIndex + cardsPerPage)
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </TabsContent>
        <TabsContent value="list">
          {!loading && sortedData.length > 0 ? (
            <div className="flex items-center py-4">
              <EventTable data={sortedData} />
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </TabsContent>
        <TabsContent value="calendar">
          <EventCalendar data={sortedData} />
        </TabsContent>
      </Tabs>
      <Separator />
    </div>
  )
}

export default EventList
