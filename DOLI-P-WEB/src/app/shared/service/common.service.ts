import { Injectable } from '@angular/core';
import { AppSetting } from '../model/app-setting';
import { FormGroup } from '@angular/forms';

declare function showSuccessToast(msg: any): any;
declare function showInfoToast(msg: any): any;
declare function showWarningToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function enableDataTable(tableId: any): any;

@Injectable({
    providedIn: 'root'
})

export class CommonService {

    showLoader() {
        (document.getElementById('loader') as HTMLElement).style.display = 'block';
        setTimeout(this.hideLoader, 15000);
    }

    hideLoader() {
        (document.getElementById('loader') as HTMLElement).style.display = 'none';
    }

    showSuccess(message: string) {
        //showSuccessToast(message);
    }

    showInfo(message: string) {
        //showInfoToast(message);
    }

    showAlert(message: string) {
        //showWarningToast(message);
    }

    showError(message: string) {
        //showDangerToast(message);
    }

    showElement(elementId: string) {
        (document.getElementById(elementId) as HTMLElement).style.display = 'block';
    }

    hideElement(elementId: string) {
        (document.getElementById(elementId) as HTMLElement).style.display = 'none';
    }

    downloadDocument(Url: string) {
        Url = Url.replace('~', '');
        const linkSource = AppSetting.ApiBaseUrl + Url;
        const downloadLink = document.createElement("a");
        downloadLink.target = "_blank";
        downloadLink.href = linkSource;
        downloadLink.download = "Blank Document";
        downloadLink.click();
    }

    setDataTable(tableId: string) {
        //enableDataTable(tableId);
    }

    convertUTCDateToLocalDate(date: Date) {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    }

    convertLocalDatetoUTCDate(date: Date) {
        return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    }

    // Check 'password' & 'confirm password' is same or not
    checkConfirmedPassword(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ confirmedValidator: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }

}