import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { MainService } from './services/main.service';

@Component({
  selector: 'esn-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private mainService: MainService,
    private meta: Meta,
    private title: Title
  ) {}

  async ngOnInit(): Promise<void> {
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.meta.addTags([
      { name: 'description', content: mainInfo?.sectionLongName },
    ]);
    this.title.setTitle('Home | ' + mainInfo?.sectionLongName);
  }
}
