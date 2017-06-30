import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent }   from "./app.component";
import { TestModule } from "./modules/module1/test.module";

@NgModule({
  imports:      [ BrowserModule, TestModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { };
