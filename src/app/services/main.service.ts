import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

interface MainItem {
  id: string;
  sectionShortName: string;
  sectionLongName: string;
  facebookLink: string;
  facebookName: string;
  instagramLink: string;
  instagramName: string;
  pretixLink: string;
  addressNameFirstLine: string;
  addressNameSecondLine: string;
  addressNameThirdLine: string;
  addressNameFourthLine: string;
  welcomeMessageFrontPage: string;
  titleColor: string;
  buttonColor: string;
  officialLogo: {
    alternativeText: string;
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
  headerImage: {
    alternativeText: string;
    formats: {
      medium: {
        url: string;
      };
    };
  };
  imageGridFrontPage: [
    {
      alternativeText: string;
      formats: {
        medium: {
          url: string;
        };
      };
    }
  ];
}

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private url = 'https://strapi.esn-freiburg.de/website-main-information';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  fetchMain(): Observable<MainItem> {
    return this.http.get<MainItem>(this.url).pipe(
      tap((_) => this.log('fetched main information')),
      catchError(this.handleError<MainItem>('fetchMainInformation'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`ContentService: ${message}`);
  }
}
