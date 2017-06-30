import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TestComponent } from "./components/test.component";

@NgModule({
    exports: [TestComponent],
    declarations: [ TestComponent ]
})

export class TestModule { }
