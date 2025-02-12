import { Component, Input } from '@angular/core';

@Component({
  selector: 'esn-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent{
  @Input() title: string = '';
  @Input() grayBg: boolean = false;
  @Input() grayBox: boolean = false;
}
