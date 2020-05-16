import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogClose, MatDialogConfig} from '@angular/material/dialog';

export interface DialogData {
  requestedPlayers: string;
  activity: string;
  language: string;
  needsMic: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'val-app';


  requestedPlayers : string;
  activity : string;
  language: string;
  needsMic: string;

  constructor(public dialog: MatDialog) {}

  openDialog(){
    const dialogConfig = new MatDialogConfig();

    let dialogRef = this.dialog.open(CreateTeamOptions, {
      height: '375px',
      width: '237px',
      data: {requestedPlayers: this.requestedPlayers, activity: this.activity, language: this.language, needsMic: this.needsMic}
    });

    dialogRef.afterClosed().subscribe(result =>{
      console.log('Dialog result is: '+ result.activity);
      this.requestedPlayers = result.requestedPlayers;
      this.activity = result.activity;
      this.language = result.language;
      this.needsMic = result.needsMic;
    });
  }


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  
  sendToDataBase(){

  }
}

@Component({
  selector: 'create-team-options',
  templateUrl: 'create-team-options.html',
  styleUrls: ['./create-team-options.scss']
})

export class CreateTeamOptions {


  constructor(
    public dialogRef: MatDialogRef<CreateTeamOptions>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
