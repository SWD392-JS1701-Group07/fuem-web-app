import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Event, EventDate } from '@/constants/models/Event'

type Props = {
    data: Event[]
}

const EventCalendar = ({ data }: Props) => {
    return (
        <FullCalendar
            plugins={[
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin
            ]}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'resourceTimelineWook, dayGridMonth,timeGridWeek'
            }}
            events={
                function (info, successCallback, failureCallback) {
                    successCallback(
                        data.map(function (event) {
                            return {
                                id: event.id.toString(),
                                title: event.name,
                                start: event.startDate,
                                end: event.endDate,
                                allDay: false
                            }
                        }))
                }
            }
            aspectRatio={2.8}
            slotMinTime={'04:00:00'}
            slotMaxTime={'22:00:00'}
            expandRows={true}
            fixedWeekCount={false}
            displayEventEnd={true}
            nowIndicator={true}
            editable={true}
            droppable={true}
            selectable={true}
            selectMirror={true}
            selectOverlap={true}
        />
    );
}

export default EventCalendar;