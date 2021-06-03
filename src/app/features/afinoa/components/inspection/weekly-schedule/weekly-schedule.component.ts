import {
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
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

import { debounced } from '../../../../../shared/helpers/debounced.function';
import { ProgrammingService } from '../../../services/programming/programming.service';
import { StoreRequest } from '../../../models';
@Component({
  selector: 'app-weekly-schedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.scss'],
})
export class WeeklyScheduleComponent implements OnInit {
  @ViewChild('modal') modal: any;

  locale: string = 'es-AR';

  weekStartsOn: number = 1;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  debouncedClick: any;

  packing: string;

  requests: any = [];

  externalEvents: CalendarEvent[] = [];

  employeesOverlapping: any = [];

  copyIndex: number;

  canPaste: boolean = false;

  activeRequest = {
    id: null,
    service: null,
    events: [],
    programmable: true,
    valid: false,
    start: new Date(),
    end: new Date(),
  };

  loading: boolean = true;

  invalidColors = {
    primary: '#ff0d07',
    secondary: '#f332327a',
  };

  constructor(private programmingService: ProgrammingService) {
    this.programmingService.fetch(3, 'sdsf').subscribe((programming) => {
      const { packing, requests } = programming;

      if (requests.length > 0) this.activeRequest = requests[0];

      this.viewDate = this.activeRequest.start;
      this.packing = packing;
      this.requests = requests;
      this.loading = false;
      this.insertEvents();
      this.refreshView();
    });

    this.programmingService
      .getEmployees()
      .subscribe(
        (employees: CalendarEvent[]) => (this.externalEvents = employees)
      );

    this.programmingService
      .removeElement()
      .subscribe((event: CalendarEvent) => this.removeElement(event));
  }

  onSelect(event: any) {
    this.events = [];
    this.activeRequest = this.requests[event.target.value];
    this.viewDate = this.activeRequest.start;

    for (let savedEvent of this.activeRequest.events) {
      const external = this.externalEvents.find(
        (e) => e.meta.extra.id == savedEvent.meta.extra.id
      );
      external.title = savedEvent.title;
      external.start = savedEvent.start;
      external.end = savedEvent.end;
      external.color = savedEvent.color;
      external.meta.valid = savedEvent.meta.valid;
      this.events.push(external);
    }
    this.refreshView();
    this.setCanPaste();
  }

  insertEvents(): void {
    for (let event of this.activeRequest.events) {
      const newEvent = this.programmingService.createWeekProgrammingEvent(
        event.meta.extra,
        event.meta.valid,
        event.start,
        event.end
      );

      this.events.push(newEvent);
    }
  }

  removeElement(event: CalendarEvent) {
    this.events = this.events.filter(
      (e) => e.meta.extra.id !== event.meta.extra.id
    );
    this.activeRequest.events = this.activeRequest.events.filter(
      (e) => e.meta.extra.id !== event.meta.extra.id
    );
  }

  ngOnInit(): void {
    this.debouncedClick = debounced(($event: any) => console.log(555), 1000);
  }

  beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent) {
    const startDay =
      this.view == CalendarView.Week
        ? this.activeRequest.start.getDay() - 1
        : 0;
    const endDay =
      this.view == CalendarView.Week ? this.activeRequest.end.getDay() - 1 : 0;
    const hours = this.activeRequest.start.getHours();
    let segmentValues = [];

    for (let column = startDay; column <= endDay; column++) {
      const hour = column === startDay ? hours : 0;

      for (let h = hour; h < 24; h++) {
        const hour = renderEvent.hourColumns[column].hours[h];

        if (hour.segments[0].date > this.activeRequest.end) break;

        if (hour.segments[0].date < this.activeRequest.start) continue;

        hour.segments.forEach((segment) => {
          if (this.matchSegmentWithActiveRequest(segment.date)) {
            segment.cssClass = 'bg-request';
            segmentValues.push(this.emptySegment(segment.date));
          }
        });
      }
    }

    this.validateRequestState(segmentValues);
  }

  private validateRequestState(segmentValues: boolean[]): void {
    if (this.requestHasEmptySegment(segmentValues) || this.misplacedEmployee())
      this.activeRequest.valid = false;
    else this.activeRequest.valid = true;
  }

  private misplacedEmployee(): boolean {
    for (let event of this.events) if (!event.meta.valid) return true;
    return false;
  }

  private matchSegmentWithActiveRequest(segment: Date): boolean {
    return (
      segment >= this.activeRequest.start && segment < this.activeRequest.end
    );
  }

  get isRequestValid(): boolean {
    return this.activeRequest.valid;
  }

  refreshView(): void {
    this.refresh.next();
  }

  eventDropped({
    event,
    newStart,
    newEnd,
    allDay,
  }: CalendarEventTimesChangedEvent): void {
    const eventLoaded = this.events.some(
      (e) => e.meta.extra.id == event.meta.extra.id
    );
    event.start = newStart;
    event.end = newEnd ? newEnd : moment(event.start).add(1, 'hours').toDate();
    event.title = this.setTitle(event);
    event = this.eventHasConflictWithDates(event);

    if (!eventLoaded) this.events.push(event);

    this.events = [...this.events];

    this.saveEventInActiveRequest(event);
  }

  saveEventInActiveRequest(event: CalendarEvent): void {
    const index = this.activeRequest.events.findIndex(
      (e) => e.meta.extra.id == event.meta.extra.id
    );

    if (index == -1) {
      const newEvent = this.programmingService.createWeekProgrammingEvent(
        event.meta.extra,
        event.meta.valid,
        event.start,
        event.end
      );
      this.activeRequest.events.push(newEvent);
    } else {
      const { title, color, start, end, meta } = event;
      this.activeRequest.events[index].meta.valid = meta.valid;
      this.activeRequest.events[index] = {
        ...this.activeRequest.events[index],
        title,
        color,
        start,
        end,
      };
    }
  }

  eventHasConflictWithDates(event: CalendarEvent): CalendarEvent {
    if (this.eventDroppedInvalid(event)) {
      event.color = this.invalidColors;
      event.meta.valid = false;
    } else {
      event.color = event.meta.color;
      event.meta.valid = true;
    }

    return event;
  }

  eventDroppedInvalid(event: CalendarEvent): boolean {
    return (
      event.start < this.activeRequest.start ||
      event.end > this.activeRequest.end
    );
  }

  private emptySegment(segment: Date): boolean {
    const segmentShift = moment(segment).add(1, 'seconds');

    for (let event of this.events) {
      if (
        moment(segmentShift).isBetween(
          moment(event.start),
          moment(event.end),
          null,
          '()'
        )
      )
        return false;
    }
    return true;
  }

  private requestHasEmptySegment(segmentValues: boolean[]): boolean {
    return segmentValues.some((segment) => segment == true);
  }

  private setTitle(event: CalendarEvent): string {
    return `<b class="fs-13">${this.fullName(
      event.meta.extra
    )} - ${this.getHours(event)}</b>`;
  }

  private getHours(event: CalendarEvent): string {
    const { start, end } = event;

    return `${moment(start).format('HH:mm')} a ${moment(end).format('HH:mm')}`;
  }

  fullName(employee: any): string {
    return `${employee.apellido} ${employee.nombre}`;
  }

  save(): void {
    this.employeesOverlapping = this.programmingService.employeesOverlapping(
      this.requests
    );

    if (this.employeesOverlapping.length > 0) return;

    const validRequests = this.requests.filter((request: any) => request.valid);

    if (validRequests.length > 0) {
      this.programmingService
        .store(StoreRequest.fromArray(this.requests))
        .subscribe((data: any) => (this.employeesOverlapping = data));
    }
  }

  copy() {
    this.copyIndex = this.requests.findIndex(
      (request) => this.activeRequest.id == request.id
    );
  }

  setCanPaste(): void {
    if (this.copyIndex == undefined) return null;

    const requestA = this.requests[this.copyIndex];
    const requestB = this.activeRequest;
    this.canPaste = this.programmingService.sameDuration(requestA, requestB);
  }

  paste(): void {
    if (this.canPaste) {
      const requestA = this.requests[this.copyIndex];
      const requestB = this.activeRequest;
      const diff = this.programmingService.requestsDiff(requestA, requestB);
      this.events = [];
      requestB.events = [];
      this.cloneEvents(requestA, requestB, diff, true);
    }
  }

  pasteAll(): void 
  {
    const requestA = this.requests[this.copyIndex];

    this.events = [];

    for(let index in this.requests) 
    {
      const requestB = this.requests[index];

      if(this.copyIndex === Number(index) || !this.programmingService.sameDuration(requestA, requestB)) continue;

      const diff = this.programmingService.requestsDiff(requestA, requestB);
      requestB.events = [];
      this.cloneEvents(requestA, requestB, diff);
      
    }
    this.paste()
  }

  cloneEvents(requestA: any, requestB: any, diff: number, current = false): void 
  {
    for (let savedEvent of requestA.events) 
    {
      const external = this.externalEvents.find((e) => e.meta.extra.id == savedEvent.meta.extra.id);
      external.start = moment(savedEvent.start).add(diff, 'hours').toDate();
      external.end = moment(savedEvent.end).add(diff, 'hours').toDate();
      external.color = savedEvent.color;
      external.meta.valid = savedEvent.meta.valid;
      external.title = this.setTitle(external);
      
      if(current) this.events.push(external);

      const newEvent = this.programmingService.createWeekProgrammingEvent(
        external.meta.extra,
        external.meta.valid,
        external.start,
        external.end
      );
      requestB.events.push(newEvent);
    }
    this.refreshView();
  }

  packings(packings: string[]): string {
    return packings.join('\n');
  }
}
