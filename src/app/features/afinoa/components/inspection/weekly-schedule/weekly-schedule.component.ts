import { ChangeDetectionStrategy, ViewEncapsulation, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarWeekViewBeforeRenderEvent,
  CalendarView,
} from 'angular-calendar';

import { debounced } from '../../../../../shared/helpers/debounced.function'

@Component({
  selector: 'app-weekly-schedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.scss']
})
export class WeeklyScheduleComponent implements OnInit {

  locale: string = 'es-AR';

  weekStartsOn: number = 1

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date()

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = []

  activeDayIsOpen: boolean = true;

  debouncedClick: any;
  
  packing: string;

  //selectedWeekEvent: WeekEvent;

  externalEvents: CalendarEvent[] = [
    {
      title: 'Juan Perez',
      color: {
        primary: 'yellow',
        secondary: 'yellow'
      },
      start: new Date(),
      draggable: true,
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      },
      actions: [
        {
      label: '<i class="fas fa-user-times text-white fs-15 mt-1 mr-2"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        
      },
    },
      ],
      meta:{
        valid: false,
        color: {
          primary: 'yellow',
          secondary: 'yellow'
        },
      }
    },
    {
      title: 'Juan Garcia',
      color:  {
        primary: 'blue',
        secondary: 'blue'
      },
      start: new Date(),
      draggable: true,
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      },
      actions: [
        {
      label: '<i class="fas fa-user-times text-white fs-15 mt-1 mr-2"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        
      },
    },
      ],
      meta:{
        valid: false,
        color: {
          primary: 'blue',
          secondary: 'blue'
        },
      }
    },
    {
      title: 'Juan Carlos',
      color:  {
        primary: 'pink',
        secondary: 'pink'
      },
      start: new Date(),
      draggable: true,
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      },
      actions: [
        {
      label: '<i class="fas fa-user-times text-white fs-15 mt-1 mr-2"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        
      },
    },
      ],
      meta:{
        valid: false,
        color:  {
          primary: 'pink',
          secondary: 'pink'
        }
      }
    }
  ];

  fakeData = [
    {
      fecha_inicio: '2021-05-11 13:00:00',
      fecha_fin: '2021-05-11 18:00:00',
    },
    {
      fecha_inicio: '2021-05-10 05:00:00',
      fecha_fin: '2021-05-11 15:00:00',
    }

  ]

  activeRequest = {
    start: new Date('2021-05-14 01:00:00'),
    end: new Date('2021-05-14 05:00:00')
  }

  invalidColors = {
    primary: '#ff0d07',
    secondary: '#f332327a'
  }

  constructor() {

    this.viewDate = this.activeRequest.start;
   }

  ngOnInit(): void {
    this.setcolors();
    this.debouncedClick = debounced(($event:any) => console.log(555), 1000);
  }

  beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent) {
    //console.log(renderEvent)
    renderEvent.hourColumns.forEach((hourColumn) => {
      hourColumn.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {
          if(this.matchHours(segment.date)) segment.cssClass = 'bg-request';
        });
      });
    });
  }

  matchHours(date: Date): boolean
  {
    return (
      date >= this.activeRequest.start &&
      date < this.activeRequest.end &&
      date.getDay() === this.activeRequest.start.getDay()
    )
  }

  eventTimesChanged({event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {

    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });

  }

  eventDropped({event, newStart, newEnd, allDay}: CalendarEventTimesChangedEvent): void {
    const externalIndex = this.externalEvents.indexOf(event);
    if (typeof allDay !== 'undefined') {
      event.allDay = allDay;
    }
    if (externalIndex > -1) {
      this.externalEvents.splice(externalIndex, 1);
      this.events.push(event);
    }
    event.start = newStart;
    if (newEnd) {
      event.end = newEnd;
    }
    if (this.view === 'month') {
      this.viewDate = newStart;
      this.activeDayIsOpen = true;
    }

    if(this.eventDroppedInValid(event))
    {
      event.color = this.invalidColors;
      event.meta.valid = false;
    }
    else 
    {
      event.color = event.meta.color;
      event.meta.valid = true;
    }
    console.log(event)

    this.events = [...this.events];
  }

  externalDrop(event: CalendarEvent) {
    if (this.externalEvents.indexOf(event) === -1) {
      this.events = this.events.filter((iEvent) => iEvent !== event);
      this.externalEvents.push(event);
    }
  }

  eventDroppedInValid(event: CalendarEvent): boolean
  {
    return (
      event.start < this.activeRequest.start || 
      event.end > this.activeRequest.end    
    )
  }

  setcolors(): void
  {
    this.externalEvents.forEach((event:CalendarEvent) => {
        const color = this.getRandomColor();
        const colors =  {primary: color, secondary: color};
        event.color = colors;
        event.meta.color = colors;
    });
  }

  getRandomColor() {
    const minimum = 5;
    const maximum = 15;
    var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 10)];
    }
    return color;
  }
}
