import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';

import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'esn-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./../base.scss']
})
export class TeamPageComponent implements OnInit {
  public readonly page: string = 'Team_page';

  constructor(private title: Title, private mainService: MainService) {}

  async ngOnInit(): Promise<void> {
    const [mainInfo] = await firstValueFrom(this.mainService.fetchMain());
    this.title.setTitle('Our Team | ' + mainInfo?.sectionLongName);
  }
}
