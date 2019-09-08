import {Component, OnInit} from '@angular/core';
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Hello who ?';

  constructor(private service:AppService) {}

  public ngOnInit(): void {
    this.service.getTitle().subscribe((title) => {
      this.title = title;
    });
  }
}
