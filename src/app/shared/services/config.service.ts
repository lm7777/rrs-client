import { AppConfig } from './data/app-config.model';
import { Inject, Injectable, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private config: AppConfig;
    configKey = makeStateKey<AppConfig>("config");

    constructor(private transferState: TransferState,
                @Inject(PLATFORM_ID) private platformId: Object,
                private httpClient: HttpClient) {
    }

    getConfig() {
        return this.config;
    }

    init(): void {
        if (!this.config) {
            if (isPlatformServer(this.platformId)) {
                this.httpClient.get('/assets/config/config.json').subscribe(result => {
                    this.config = result as AppConfig;
                    this.transferState.set(this.configKey, result);
                })
            } else {
                this.config = this.transferState.get(this.configKey, null);
                this.transferState.remove(this.configKey);
            }
        }
    }
}
