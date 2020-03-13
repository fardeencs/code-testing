import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notify',
  template: `
  <div class='notify-container'>
    <section class="section-notification">
      <ul class="notifications">
        <li class="msg-section">
          <span><i class="material-icons">{{icon}}</i></span>
          <span>{{message}}</span>
        </li>
      </ul>
    </section>
  </div>
  `,
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

  @Input() message: string;
  @Input() icon = 'error_outline';

  constructor() { }

  ngOnInit() {
    console.log('message', this.message);
  }

}
