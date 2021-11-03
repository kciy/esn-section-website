import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainItem, MainService } from 'src/app/services/main.service';
import { CalendarOptions } from '@fullcalendar/angular';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventItem, EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent implements OnInit {
  globals$: Observable<MainItem>;
  events$: Observable<EventItem[]>;

  pretixLink;

  constructor(
    private title: Title,
    private mainService: MainService,
    private eventsService: EventsService,
    public http: HttpClient
  ) {}

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    firstDay: 1,
    showNonCurrentDates: false,
    fixedWeekCount: false,
    aspectRatio: 1.8,
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: false,
      hour12: false,
    },
    eventClick: function (info) {
      info.jsEvent.preventDefault();
      const title = info.event.title;
      const details = info.event.extendedProps.details;
      const cause = info.event.extendedProps.cause;
      const link = info.event.url;
      const date = info.event.start;
      appendLog(title, details, cause, link, date);
    },
    // events: async function () {
    //   const [result] = await firstValueFrom(this.eventsService.fetchEvents());

    //   // const result_2 = await result.json();
    //   if (result) {
    //     return result.map((r) => ({
    //       start: new Date(r.start),
    //       end: new Date(r.end),
    //       title: r.title,
    //       url: r.url,
    //       extendedProps: {
    //         details: r.details,
    //         cause: r.causes,
    //       },
    //     }));
    //   }
    //   return [];
    // },
  };

  async ngOnInit() {
    this.globals$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res) => res[0])
    );
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.title.setTitle('Events | ' + mainInfo?.sectionLongName);
    // this.events$ = this.eventsService.fetchEvents().pipe(shareReplay(1));
    const [events] = await firstValueFrom(this.eventsService.fetchEvents());
    this.calendarOptions.events = events;
  }
}
function appendLog(
  title: string,
  details: string,
  cause: string,
  link: string,
  date: Date
) {
  // var detailsEl = document.createElement('div');
  // detailsEl.textContent = details;
  // document.querySelector('#details').innerHTML = '';
  // document.querySelector('#details').appendChild(detailsEl);
  // document.querySelector('#title').innerHTML = title;
  // document.querySelector('#cause').innerHTML = 'Cause: ' + convertCause(cause);
  // document.querySelector('#link').innerHTML = link;
  // document.querySelector('#link').setAttribute('href', link);
  // document.querySelector('#date').innerHTML =
  //   date.toLocaleString('de-DE', {
  //     day: 'numeric',
  //     month: 'long',
  //     year: 'numeric',
  //     hour: 'numeric',
  //     minute: '2-digit',
  //     hour12: false,
  //   }) + ' Uhr';
}

function convertCause(cause: string) {
  switch (cause) {
    case 'Education_Youth':
      return 'Education & Youth';

    case 'Environmental_Sustainability':
      return 'Environmental & Sustainability';

    case 'Health_Wellbeing':
      return 'Health & Wellbeing';

    case 'Skills_Employability':
      return 'Skills & Employability';

    case 'Social_Inclusion':
      return 'Social Inclusion';

    default:
      return 'Culture';
  }
}
