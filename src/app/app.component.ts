import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogClose, MatDialogConfig} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {RequestModel} from 'src/models/lfgRequestModel'
import {LFGService} from 'src/services/lfgService';
import { FormGroup } from '@angular/forms';

export interface DialogData {
  RiotID: string;
  PlayersNeeded: string;
  Activity: string;
  Language: string;
  NeedMic: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;
  title = 'val-app';


  RiotID: string;
  PlayersNeeded: string;
  Language: string;
  NeedMic: string;
  Activity: string;

  constructor(public dialog: MatDialog, private lfgrequest: LFGService) {}

  ngOnInit() {
    this.lfgrequest.read().subscribe((data: DialogData[]) => { //? api call to get posts
      console.log(data);
      this.dataSource.data = data.reverse();
    }); 
  }

  openDialog(){
    const val = this.form.value;
    const dialogConfig = new MatDialogConfig();

    let dialogRef = this.dialog.open(CreateTeamOptions, {
      height: '375px',
      width: '237px',
      data: {requestedPlayers: this.PlayersNeeded, activity: this.Activity, language: this.Language, needsMic: this.NeedMic, riotID: this.RiotID, post: this.postrequests()}
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.PlayersNeeded = result.requestedPlayers;
      this.Activity = result.activity;
      this.Language = result.language;
      this.NeedMic = result.needsMic;
      this.RiotID = result.riotID;

    });
  }
  postrequests(){
    this.lfgrequest.write(this.RiotID, this.PlayersNeeded, this.Language, this.NeedMic, "Null")
    console.log("sending to database")
  }

  dataSource = new MatTableDataSource<RequestModel>([]);
  displayedColumns: string[] = ['RiotID', 'PlayersNeeded', 'Language', 'NeedMic'];
  
  visible = true;
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
