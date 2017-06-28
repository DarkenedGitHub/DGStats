import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {

    public alerts: IAlert[] = [];

    public closeAlert(alert: IAlert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    public addAlert(message: string, type: string = 'info') {
        this.alerts.push({
            message: message,
            type: type,
        });
    }

}

export interface IAlert {

    message: string;
    type: string;

}