import { Event } from '@/constants/models/Event'
import { useNavigate } from 'react-router-dom'

interface EventCardProps {
  event: Event
}

const EVENT_PLACEHOLDER_URL =
  'https://img.freepik.com/free-vector/friends-partying-drinking-different-beverages_53876-66174.jpg'
const AVATAR_PLACEHOLDER_URL = 'https://avatar.iran.liara.run/public/15'

const formatDateTime = (dateTimeString: string, format: 'date' | 'time'): string => {
  const dateObject = new Date(dateTimeString)
  if (format === 'date') {
    return dateObject.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } else {
    return dateObject.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric'
    })
  }
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate()
  const handleEventClick = (id: number) => {
    navigate(`/event/${id}`)
  }

  return (
    <div className="relative m-5 max-w-md overflow-hidden rounded-lg border border-white/20 bg-[#282c34] bg-gradient-to-t from-[#282c34] to-[rgba(17,0,32,0.5)] shadow-[0_7px_20px_5px_rgba(0,0,0,0.53)] backdrop-blur-lg transition-all duration-500 before:fixed before:left-[-100%] before:top-[-10%] before:h-[60rem] before:rotate-[-45deg] before:shadow-[0_0_100px_40px_rgba(255,255,255,0.03)] before:transition-all before:duration-700 before:content-[''] hover:scale-105 hover:border-white/40 hover:shadow-[0_7px_50px_10px_rgba(0,0,0,0.67)] hover:brightness-125 hover:before:left-[200%] hover:before:top-[-100%]">
      <div
        onClick={() => handleEventClick(event.id as number)}
        className="mx-auto flex w-96 cursor-pointer flex-col p-4"
      >
        <img
          className="tokenImage h-64 w-full rounded-md object-cover"
          src={event.avatarUrl || EVENT_PLACEHOLDER_URL}
          alt={event.name}
        />
        <h2 className="mt-4 text-2xl font-bold text-white">
          {event.name}{' '}
          <span className="ml-1 rounded-xl bg-indigo-400 px-4 text-xl font-semibold not-italic text-white">
            {event.subjectId}
          </span>
        </h2>
        <h2 className="mt-1 italic text-gray-300">{formatDateTime(event.startDate, 'date')} </h2>
        <p className="description my-2 text-gray-300">{event.description}</p>
        <div className="tokenInfo my-4 flex items-center justify-between">
          <div className="price flex items-center font-bold text-indigo-300">
            <p>
              {event.price}
              <u>đ</u>
            </p>
          </div>
          <div className="duration flex items-center text-gray-400">
            <ins className="mx-2 mb-[0.1rem] not-italic no-underline">◷</ins>
            <p>
              {formatDateTime(event.startTimeOverall, 'time') +
                ' - ' +
                formatDateTime(event.endTimeOverall, 'time')}
            </p>
          </div>
        </div>
        <hr className="w-full border-t border-gray-400/50" />
        <div className="creator mt-2 flex items-center">
          <div className="wrapper flex items-center rounded-full border border-white/20 p-1 shadow-inner">
            <img
              src={AVATAR_PLACEHOLDER_URL}
              className="h-8 w-8 rounded-full border border-white/20 object-cover"
              alt="C"
            />
          </div>
          <p className="ml-2 text-gray-400">
            <ins className="not-italic no-underline">Hosted by</ins> {event.ownerId}
          </p>
        </div>
      </div>
    </div>
  )
}

export default EventCard
