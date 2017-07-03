import { platformBrowser } from "@angular/platform-browser";
import { AppModuleNgFactory } from "../../app-aot/client/app/app.module.ngfactory";

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
