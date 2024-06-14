import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getAll } from '@/api/eventApi'
import EventCalendar from './component/EventCalendar'
// import EventTable from './component/EventTable'
import { Event } from '@/constants/models/Event'
import { Separator } from '@/components/ui/separator'
import EventCard from './component/EventCard'

const EventList = () => {
  const [data, setData] = React.useState<Event[]>([])
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    getEvents()
  }, [])

  const getEvents = async () => {
    try {
      const response = await getAll()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      setData(response)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  return (
    <div className="dark w-full bg-black px-16 pb-10 text-white">
      <h1 className="mx-auto w-full py-8 font-jura text-6xl font-semibold">Events</h1>
      <Tabs defaultValue="list" className="">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          {/* Check if data is loaded and not empty */}
          {!loading && data.length > 0 ? (
            <div className="flex flex-wrap">
              {/* Render EventCard for each event in data */}
              {data.map((event) => (
                <div key={event.id as React.Key}>
                  <EventCard event={event} />
                </div>
              ))}
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
