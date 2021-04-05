import { ActivatedRoute } from '@angular/router';
import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, OnDestroy } from '@angular/core';

import { startOfWeek, format } from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

import { CustomDateFormatter } from '../../../../../shared/providers';

import { PackingsService } from '../../../services/packings.service';
import { WeekEvent, WeekRequest } from '../../../models';
import { SpinnerService } from 'src/app/core/services/spinner.service';

import { debounced } from '../../../../../shared/helpers/debounced.function'

@Component({
  selector: 'app-weekly-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './weekly-view.component.html',
  styleUrls: ['./weekly-view.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class WeeklyViewComponent implements OnInit, OnDestroy {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  private packingId: number;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date()

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = []

  activeDayIsOpen: boolean = true;

  debouncedClick: any;

  constructor(
    private route: ActivatedRoute,
    private packingService: PackingsService,
    private spinner: SpinnerService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.packingId = Number(params['id']));
    this.debouncedClick = debounced(($event:any) => this.getRequests(), 1000);
    this.getRequests();
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

  getRequests()
  {
      this.events = [];
      this.spinner.show();
      const startOfWeekDay = format(startOfWeek(this.viewDate), 'yyyy-MM-dd');
      this.packingService.getWeek(this.packingId, startOfWeekDay).subscribe(
        (weekRequests: WeekRequest[]) => {
          WeekEvent.fromArray(weekRequests).forEach(event => this.addEvent(event))
          document.getElementById('render').click()
          this.spinner.hide();
      });
  }

  addEvent(event: WeekEvent)
  {
    this.events = [...this.events, event];
  }

  render(){}

  ngOnDestroy() {
    this.debouncedClick.unsubscribe();
  }

}
