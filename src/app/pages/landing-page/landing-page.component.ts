import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { firstValueFrom, map, Observable, shareReplay } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IContentItem, ContentService } from 'src/app/services/content.service';
import { IMainItem, MainService } from 'src/app/services/main.service';

@Component({
  selector: 'esn-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss', './../base.scss']
})
export class LandingPageComponent implements OnInit {
  contentInfo$: Observable<IContentItem[]> | undefined;
  globals$: Observable<IMainItem> | undefined;
  public gridImageSize: string[] = ['small', 'small', 'small', 'small'];

  mainInfo: any;

  public images!: GalleryItem[];
  public strapiLink: string = environment.STRAPI_SECTION_URL_IMAGE;
  public showThumb: boolean = true;
  public isBrowser: boolean;
  public readonly page: string = 'Landing_page';

  constructor(
    private title: Title,
    private contentService: ContentService,
    private mainService: MainService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.setGalleryThumb();
  }

  async ngOnInit(): Promise<void> {
    this.globals$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res: any) => res[0])
    );
    this.contentInfo$ = this.contentService
      .fetchPageContent(this.page)
      .pipe(shareReplay(1));
    [this.mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.title.setTitle('Home | ' + this.mainInfo?.sectionLongName);

    this.setGalleryThumb();
    this.setGridImageSize();

    this.images = [];
    if (this.mainInfo?.imageGridFrontPage) {
      for (let img of this.mainInfo.imageGridFrontPage) {
        if (img.formats.medium) {
          this.images.unshift(
            new ImageItem({
              src: `${environment.STRAPI_SECTION_URL_IMAGE}${img.formats.medium.url}`,
              thumb: `${environment.STRAPI_SECTION_URL_IMAGE}${img.formats.thumbnail.url}`,
            })
          );
        } else if (img.formats.small) {
          this.images.unshift(
            new ImageItem({
              src: `${environment.STRAPI_SECTION_URL_IMAGE}${img.formats.small.url}`,
              thumb: `${environment.STRAPI_SECTION_URL_IMAGE}${img.formats.thumbnail.url}`,
            })
          );
        }
      }
    }
  }

  private setGridImageSize(): void {
    this.globals$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res: any) => res[0])
    );
    for (let img in [0, 1, 2, 3]) {
      if (this.mainInfo?.imageGridFrontPage[img]?.formats?.large) {
        this.gridImageSize[img] = 'large';
      } else if (this.mainInfo?.imageGridFrontPage[img]?.formats?.medium) {
        this.gridImageSize[img] = 'medium';
      } else {
        this.gridImageSize[img] = 'small';
      }
    }
  }

  private setGalleryThumb(): void {
    if (this.isBrowser) {
      if (window.innerWidth < 1000) {
        this.showThumb = false;
      }
    }
  }

  public comic(): void {
    const navigation = this.document.getElementById('navinav');
    const title = this.document.getElementById('titeli');
    if (navigation?.getAttribute('style') == 'font-family: "Comic Sans"') {
      navigation.setAttribute('style', 'font-family: "Oswald"');
      title?.setAttribute('style', 'font-family: "Oswald"');
    } else {
      navigation?.setAttribute('style', 'font-family: "Comic Sans"');
      title?.setAttribute('style', 'font-family: "Comic Sans"');
    }
  }
}
