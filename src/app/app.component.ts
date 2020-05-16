import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogClose, MatDialogConfig} from '@angular/material/dialog';
import { CreateTeamOptionsComponent } from './create-team-options/create-team-options.component';

export interface DialogData {
  requestedPlayers: string;
  activity: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'val-app';

  requestedPlayers : string;
  activity : string;

  constructor(public dialog: MatDialog) {}

  openDialog(){
    
    const dialogConfig = new MatDialogConfig();

    let dialogRef = this.dialog.open(CreateTeamOptionsComponent, {
      height: '300px',
      width: '250px',
      data: {requestedPlayers: this.requestedPlayers, activity: this.activity}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result is: '+ result);
    });
  }
}
@Component({
  selector: 'create-team-options',
  templateUrl: 'create-team-options/create-team-options.component.html',
})
export class CreateTeamOptions {

  constructor(
    public dialogRef: MatDialogRef<CreateTeamOptions>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
