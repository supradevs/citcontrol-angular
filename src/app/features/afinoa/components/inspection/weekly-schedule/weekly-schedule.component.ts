import { ChangeDetectionStrategy, ViewEncapsulation, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';

import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarWeekViewBeforeRenderEvent,
  CalendarView,
} from 'angular-calendar';

import { debounced } from '../../../../../shared/helpers/debounced.function'
import { ProgrammingService } from '../../../services/programming/programming.service';
import { WeekProgrammingEvent } from './../../../models/week-programming-event.model';

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

  requests: any = []

  externalEvents: CalendarEvent[] = [];

  activeRequest = {
    id: null,
    events: [],
    programmable: true,
    valid: false,
    start: new Date,
    end: new Date,
  };

  loading: boolean = true;

  invalidColors = {
    primary: '#ff0d07',
    secondary: '#f332327a'
  }

  constructor(private programmingService: ProgrammingService) {

    this.programmingService.fetch(3,'sdsf').subscribe(programming => {

      const {packing, requests} = programming;

      if(requests.length > 0) this.activeRequest = requests[0];
      
      this.viewDate = this.activeRequest.start;
      this.packing = packing;
      this.requests = requests;
      this.loading = false;
      this.insertEvents();
      this.refreshView();      
    });

    this.programmingService.getEmployees().subscribe((employees: CalendarEvent[]) => this.externalEvents = employees);

    this.programmingService.removeElement().subscribe((employee: CalendarEvent) => this.removeElement(employee));

   }

  onSelect(event: any)
  {
    this.events = [];
    this.activeRequest = this.requests[event.target.value];

    for(let savedEvent of this.activeRequest.events)
    {
      const index = this.externalEvents.findIndex(e => e.meta.extra.id == savedEvent.meta.extra.id);
      const external = this.externalEvents[index];
      external.start = savedEvent.start;
      external.end = savedEvent.end;
      external.color = savedEvent.color;
      external.meta.valid = savedEvent.meta.valid;  
      this.events.push(external);
    }

    this.refreshView()
  }

  insertEvents(): void 
  {
    for(let event of this.activeRequest.events)
    {
      const newEvent = new WeekProgrammingEvent(
          event.meta.valid,
          event.meta.extra,
          () => console.log(777),
          event.start,
          event.end,
        )
      this.events.push(newEvent);
    }
  }

  removeElement(employee: CalendarEvent)
  {
    this.activeRequest.events = this.activeRequest.events.filter((e) => e.meta.extra.id !== employee.meta.extra.id );
  }

  ngOnInit(): void {
    this.debouncedClick = debounced(($event:any) => console.log(555), 1000);
  }

  beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent) {
    const startDay = this.activeRequest.start.getDay() - 1;
    const endDay = this.activeRequest.end.getDay() - 1;
    const hours = this.activeRequest.start.getHours()
    let segmentValues = [];
   
    for(let column = startDay; column <= endDay; column++)
    {
      const hour = (column === startDay) ? hours : 0;
      
      for(let h = hour; h < 24; h++)
      {
        const hour = renderEvent.hourColumns[column].hours[h];

        if(hour.segments[0].date > this.activeRequest.end) break;

        hour.segments.forEach((segment) => {
          
          if(this.matchSegmentWithActiveRequest(segment.date))
          {
            segment.cssClass = 'bg-request';
            segmentValues.push(this.emptySegment(segment.date))
          } 
        });
      }

    }

    this.validateRequestState(segmentValues);
  }

  private validateRequestState(segmentValues: boolean[]): void
  {
    if(this.requestHasEmptySegment(segmentValues) || this.misplacedEmployee())
      this.activeRequest.valid = false;
    else
      this.activeRequest.valid = true;
  }

  private misplacedEmployee(): boolean 
  {
    for(let event of this.events)
      if(!event.meta.valid) return true;
    return false;
  }

  private matchSegmentWithActiveRequest(segment: Date): boolean
  {
    return segment >= this.activeRequest.start && segment < this.activeRequest.end;
  }

  get isRequestValid(): boolean 
  {
    return this.activeRequest.valid;
  }

  refreshView(): void {
    this.refresh.next();
  }

  eventDropped({event, newStart, newEnd, allDay}: CalendarEventTimesChangedEvent): void {
      
    const eventLoaded = this.events.some(e => e.meta.extra.id == event.meta.extra.id);
    event.start = newStart;
    event.end   = newEnd ? newEnd : moment(event.start).add(1, 'hours').toDate();
    event.title = this.setTitle(event);
    event       = this.eventOutOfRange(event);
    
    if (!eventLoaded) this.events.push(event);

    this.events = [...this.events];
    this.saveEventInActiveRequest(event);
  }

  saveEventInActiveRequest(event: CalendarEvent): void 
  {
    const index = this.activeRequest.events.findIndex(e => e.meta.extra.id == event.meta.extra.id);
  
    if(index == -1) 
    {
      this.activeRequest.events.push(
        new WeekProgrammingEvent(
          event.meta.valid,
          event.meta.extra,
          () => console.log(777),
          event.start,
          event.end,
        )
      )
    }
    else 
    {
      this.activeRequest.events[index].color = event.color;
      this.activeRequest.events[index].start = event.start;
      this.activeRequest.events[index].end = event.end;
      this.activeRequest.events[index].meta.valid = event.meta.valid;

    }
  }

  eventOutOfRange(event: CalendarEvent): CalendarEvent 
  {
    if(this.eventDroppedInvalid(event))
    {
      event.color = this.invalidColors;
      event.meta.valid = false;
    }
    else 
    {
      event.color = event.meta.color;
      event.meta.valid = true;
    }

    return event;
  }

  eventDroppedInvalid(event: CalendarEvent): boolean
  {
    return (
      event.start < this.activeRequest.start || 
      event.end > this.activeRequest.end    
    )
  }

  private emptySegment(segment: Date): boolean 
  {
    const segmentShift = moment(segment).add(1, 'seconds');

    for(let event of this.events)
    {
      if(moment(segmentShift).isBetween(moment(event.start), moment(event.end), null, '()')) return false;
    }
    return true;
  }

  private requestHasEmptySegment(segmentValues: boolean[]): boolean
  {
    return segmentValues.some(segment => segment == true);
  }

  private setTitle(event:CalendarEvent): string
  {
    return `<b class="fs-13">${ this.fullName(event.meta.extra) } - ${ this.getHours(event) }</b>`;
  }

  private getHours(event: CalendarEvent): string 
  {
    const {start, end} = event;

    return `${ moment(start).format('HH:mm') } a ${ moment(end).format('HH:mm') }`;
  }
  
  fullName(employee: any): string 
  {
    return `${ employee.apellido } ${ employee.nombre }`;
  }

}
