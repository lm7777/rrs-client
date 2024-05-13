import { Injectable } from '@angular/core';
import { UserService } from '../../user/services/user.service';
import { take } from 'rxjs';
import { User } from '../../user/data/user.model';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private userName: string = null;

    constructor(private userService: UserService) {
        this.userService.getUserInfo().pipe(take(1))
            .subscribe((user: User) => {
                this.userName = user.userName;
            });
    }

    private getKeyWithUserName(key: string) {
        return `${key}:${this.userName}`;
    }

    getSetting(key: string): string {
        return localStorage.getItem(key);
    }

    getUserSetting(key: string): string {
        return this.getSetting(this.getKeyWithUserName(key));
    }

    setSetting(key: string, value: any): void {
        localStorage.setItem(key, (typeof value === 'object') ? JSON.stringify(value) : value);
    }

    setUserSetting(key: string, value: any): void {
        this.setSetting(this.getKeyWithUserName(key), value);
    }

    removeSetting(key: string): void {
        localStorage.removeItem(key);
    }

    removeUserSetting(key: string): void {
        this.removeSetting(this.getKeyWithUserName(key));
    }
}
