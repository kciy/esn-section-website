import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

export interface IPartnerItem {
  id: string;
  Name: string;
  Deal: string;
  Link: string;
  Main_image: {
    id: string;
    alternativeText: string;
    url: string;
    formats: {
      medium: {
        url: string;
      };
    };
  };
  show: boolean;
  buttonText: string;
}

@Injectable()
export class PartnerService {
  private url =
    environment.STRAPI_SECTION_URL +
    'partners?_created_by=' +
    environment.STRAPI_SECTION_ID +
    '&_sort=Order';
  private dataRequest;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.dataRequest = this.http.get<IPartnerItem[]>(this.url).pipe(
      shareReplay(1),
      tap((_) => this.log('fetched partner')),
      catchError(this.handleError<IPartnerItem[]>('fetchPartnerList', []))
    );
  }

  fetchPagePartner(): Observable<IPartnerItem[]> {
    return this.dataRequest;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`PartnerService: ${message}`);
  }
}
