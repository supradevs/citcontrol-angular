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
import { WeekEvent } from '../../../models';
import { SpinnerService } from 'src/app/core/services/spinner.service';

import { debounced } from '../../../../../shared/helpers/debounced.function'
import { PackingCancellationStates, PackingsStatesIds } from 'src/app/shared/models';

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

  @ViewChild('modal') modal:any

  private packingId: number;

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

  selectedWeekEvent: WeekEvent;

  action: CalendarEventAction = {
      label: '<i class="fas fa-exclamation-triangle text-white mr-2"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent(event);
      },
  }
  

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

  getRequests(): void
  {
      this.events = [];
      this.spinner.show();
      const startOfWeekDay = format(startOfWeek(this.viewDate,  {weekStartsOn: 1}), 'yyyy-MM-dd');
      this.packingService.getWeek(this.packingId, startOfWeekDay).subscribe(
        (data:any) => {
          this.packing = data.empaque;
          WeekEvent.fromArray(data.solicitudes).forEach((event:WeekEvent) => this.addEvent(event))
          this.refreshView();
          this.spinner.hide();
      });
  }

  addEvent(event: WeekEvent): void
  {

    const cancelled = event.meta.estado_id == PackingsStatesIds.CANCELADAS_FUERA_DE_TERMINO;
    const pendingOfValidation = event.meta.estado_validacion_id == PackingCancellationStates.PENDIENTE;

    if(cancelled && pendingOfValidation )
    {
      event.actions.push(this.action);
    }
    this.events = [...this.events, event];
  }

  handleEvent(event:any): void
  {
    this.selectedWeekEvent = event;
    this.modal.open()
  }

  onValid(accept: boolean): void
  {
    this.spinner.show()
    const requestId = this.selectedWeekEvent.meta.id;
    const statusId = PackingCancellationStates.VALIDADO;
    this.packingService.modifyCancellation(requestId, statusId)
    .subscribe(
      (data) => this.updateEvent(data),
      (error) => alert('ocurrio un erro'),
      () => this.spinner.hide()
    );
  }

  onInvalid(accept: boolean): void
  {
    const statusId = PackingCancellationStates.RECHAZADO;
    const packingId = this.selectedWeekEvent.meta.id;
  }

  private updateEvent(request:any)
  {
    const index = this.events.findIndex(e => e.meta.id == request.id)
    this.events[index].actions.length = 0;
    this.events[index].meta = request;
    this.refreshView()
  }

  refreshView(): void {
    this.refresh.next();
  }

  ngOnDestroy() {
    this.debouncedClick.unsubscribe();
  }

}
