import { AppModule } from './app.module';
import { OpaqueToken } from '@angular/core';

export class AppConfig {
    readonly COOKIE_KEY: string = 'MEAN2-Starter';
    readonly COOKIE_TTL: number = 432e6 //5 days
}