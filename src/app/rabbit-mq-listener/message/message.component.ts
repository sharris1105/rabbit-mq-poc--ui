import { Component, Input, OnInit } from '@angular/core';
import * as stomp from 'stompts';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() frame: stomp.Frame;

  get type(): any {
    return ('type' in this.frame.headers) ? this.frame.headers['type'] : undefined;
  }

  get body(): string {
    if ('application/json' === this.contentType) {
      try {
        const obj = JSON.parse(this.frame.body);
        return JSON.stringify(obj, null, 2);
      } catch (ex) {
        console.error(ex);
        return undefined;
      }
    }

    return this.frame.body;
  }

  get contentType(): any {
    return ('content-type' in this.frame.headers) ? this.frame.headers['content-type'] : undefined;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
