import { BehaviorSubject } from "rxjs";

export interface ChildItemComponent {
    data: any;
    _changableData:BehaviorSubject<any>;

    
    getValue();

    saveData();
    addNewClicked();
    setData(data);
}