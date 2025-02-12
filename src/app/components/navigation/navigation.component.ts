import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

import { IMainItem, MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'esn-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  globals$: Observable<IMainItem> | undefined;
  public bgImage$: Observable<object> | undefined;
  public buttonColor$: Observable<object> | undefined;

  constructor(
    private mainService: MainService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  async ngOnInit(): Promise<void> {
    this.setMainItem();
    this.setNavBgImage();
    this.setSocialMediaButtonColor();
  }

  private setMainItem(): void {
    this.globals$ = this.mainService.fetchMain().pipe(
      shareReplay(1),
      map((res: IMainItem[]) => res[0])
    );
  }

  private setNavBgImage(): void {
    this.bgImage$ = this.globals$?.pipe(
      map((res: IMainItem) => ({
        'background-image': `linear-gradient(69deg,rgba(46, 49, 146, 0.8) 19%, ${this.getButtonColor(
          res?.buttonColor
        )}, 0.8) 80%), url("${environment.STRAPI_SECTION_URL_IMAGE}${
          res?.headerImage.url
        }")`,
      }))
    );
  }

  private setSocialMediaButtonColor(): void {
    this.buttonColor$ = this.globals$?.pipe(
      map((res: IMainItem) => ({
        'background-color': `${this.getButtonColor(res?.buttonColor)})`,
      }))
    );
  }

  public toggleMenu(): void {
    const burger = this.document.getElementById('burger') as HTMLUListElement;
    const menu = this.document.getElementById('menu') as HTMLUListElement;
    burger.classList.toggle('hidden');
    menu.classList.toggle('hidden');
  }

  public toggleBubble(bubble: 1 | 2): void {
    const b1 = this.document.getElementById('bubble1') as HTMLDivElement;
    const b2 = this.document.getElementById('bubble2') as HTMLDivElement;
    if (bubble === 1) {
      b1.classList.toggle('visible');
      b1.classList.toggle('invisible');
    } else if (bubble === 2) {
      b2.classList.toggle('visible');
      b2.classList.toggle('invisible');
    }
  }

  private getButtonColor(colorString: string): string {
    switch (colorString) {
      case 'esnGreen':
        return 'rgb(122, 193, 67';
      case 'esnPink':
        return 'rgb(236, 0, 140';
      case 'esnOrange':
        return 'rgb(244, 123, 32';
      case 'esnLightBlue':
        return 'rgb(0, 174, 239';
      case 'esnDarkBlue':
        return 'rgb(46, 49, 146';
      default:
        return 'rgb(255, 255, 255';
    }
  }
}
