import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getAll } from '@/api/eventApi'
import EventCalendar from './component/EventCalendar'
// import EventTable from './component/EventTable'
import { Event } from '@/constants/models/Event'
import { Separator } from '@/components/ui/separator'
import EventCard from './component/EventCard'
import EventTable from './component/EventTable'
import { useState, useEffect } from 'react'
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

  return (
    <div className="dark w-full bg-black px-16 pb-10 text-white">
      <h1 className="mx-auto w-full py-8 font-jura text-6xl font-semibold">Events</h1>
      <Tabs defaultValue="card" className="">
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
          {/* Check if data is loaded and not empty */}
          {!loading && data.length > 0 ? (
            <div className="flex flex-wrap">
              {/* Render EventCard for each event in data */}
              {data.slice(startIndex, endIndex).map((event) => {
                return (
                  <>
                    <EventCard event={event} />
                  </>
                )
              })}
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
                      endIndex >= data.length ? 'pointer-events-none opacity-50' : undefined
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
          {/* Check if data is loaded and not empty */}
          {!loading && data.length > 0 ? (
            <div className="flex items-center py-4">
              <EventTable data={data} />
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </TabsContent>
        <TabsContent value="calendar">
          <EventCalendar data={data} />
        </TabsContent>
      </Tabs>

      <Separator />
    </div>
  )
}

export default EventList
