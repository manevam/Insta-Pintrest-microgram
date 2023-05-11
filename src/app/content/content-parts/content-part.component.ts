import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { IContent } from "../content.interface";

@Component({
  selector: 'content-part',
  templateUrl: "./content-part.component.html",
  styleUrls: ["./content-part.component.css"]
})
export class ContentPartComponent{
  @Input() post: IContent | any;
  @Output() eventClick = new EventEmitter();
  constructor(private info: AppComponent) { }


}
