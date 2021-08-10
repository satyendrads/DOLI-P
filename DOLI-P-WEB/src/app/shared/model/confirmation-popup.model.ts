export class ConfirmationPopupModel {
    RecordId: number;
    RecordType: string;
    IsShow: boolean = false;
    Message: string;
    Heading: string = 'Confirmation';
    AcceptButtonName: string = 'Yes';
    DeclineButtonName: string = 'No';
}
