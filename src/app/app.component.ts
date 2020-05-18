import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogClose, MatDialogConfig} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {RequestModel, BaseModel} from 'src/models'
import {LFGService} from 'src/services/lfgService';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';

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
export class AppComponent implements OnInit  {

  title = 'val-app';


  RiotID: string;
  PlayersNeeded: string;
  Language: string;
  NeedMic: string;
  Activity: string;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private lfgrequest: LFGService) {

  }

  dataSource = new MatTableDataSource<RequestModel>([]);
  displayedColumns: string[] = ['RiotID', 'PlayersNeeded', 'Activity','Language', 'NeedMic', 'actions'];

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.lfgrequest.read().subscribe((data: DialogData[]) => { //? api call to get posts
      console.log(data);
      this.dataSource.data = data.reverse();
    }); 
  }

  refreshTable(){
    this.lfgrequest.read().subscribe((data: DialogData[]) => { //? api call to get posts
      console.log(data);
      this.dataSource.data = data.reverse();
    }); 
  }
  onJoin(selectedItem: any) {
    const joinDialogConfig = new MatDialogConfig();

    let dialogRef = this.dialog.open(JoinConfirmDialog, {
      height: '400px',
      width: '600px',
      data: {RiotID: selectedItem.RiotID, PlayersNeeded: selectedItem.PlayersNeeded, Activity: selectedItem.Activity, Language: selectedItem.Language, NeedMic: selectedItem.NeedMic}
    });
    
    console.log("Selected item Id: ", selectedItem); // You get the Id of the selected item here
  }

  openDialog(){

    const dialogConfig = new MatDialogConfig();

    let dialogRef = this.dialog.open(CreateTeamOptions, {
      height: '470px',
      width: '270px',
      data: {}
    });


    dialogRef.afterClosed().subscribe(result =>{
      if (result === true) {
        
      }

    });
  }
  
  visible = true;
}

@Component({
  selector: 'joinConfirmDialog',
  templateUrl: 'joinConfirmDialog.html',
  styleUrls: ['./joinConfirmDialog.scss']
})

export class JoinConfirmDialog{

  constructor(public dialogref: MatDialogRef<JoinConfirmDialog>,  
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder, private lfg: LFGService, private snackBar : MatSnackBar){

  }

  joinTeam(){
    console.log("join team initiated")
    enddate: new FormControl(new Date(new Date().setDate(new Date().getDate() + 1)))
    this.lfg.playerJoin(this.data.RiotID, this.data.PlayersNeeded, this.data.Activity, this.data.Language, this.data.NeedMic).subscribe((data: BaseModel) =>{
    });
    console.log("sent to lfg service with: ", this.data)
    this.dialogref.close();
  }

  onNoClick(): void {
    this.dialogref.close();
  }
}


@Component({
  selector: 'create-team-options',
  templateUrl: 'create-team-options.html',
  styleUrls: ['./create-team-options.scss']
})

export class CreateTeamOptions {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateTeamOptions>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder, private lfg: LFGService, private snackBar : MatSnackBar) {

      this.form = this.fb.group({
        riotID: ['', [Validators.required, Validators.maxLength(50)]],
        playersNeeded: ['', [Validators.required, Validators.maxLength(500)]],
        language_: [''],
        needMic: [''],
        activity_: [''],
        enddate: new FormControl(new Date(new Date().setDate(new Date().getDate() + 1)))
      });

    }
    
    ngOnIt(){
      const val = this.form.value;
      
      val.enddate = new Date(val.enddate.setHours(17, 0, 0, 0)).toJSON();

      data: {lfg: [val.riotID, val.playersNeeded, val.language_, val.activity_, val.needMic, val.enddate/*, localStorage.getItem('pt-username')*/]}
    }


    post(){
      this.postrequests(this.form.value);
    }

    postrequests(val: {riotID: string, playersNeeded: string, language_: string, activity_:string, needMic: string, enddate: string}){
    if(Number(val.playersNeeded) >= 1){
        this.lfg.write(val.riotID, val.playersNeeded, val.activity_, val.language_, val.needMic).subscribe((data: BaseModel) =>{
          if (data.status === 401) {
            console.log("ERROR: 401");
          } else {
            this.snackBar.open('Notice created Successfully', 'Ok', {
              duration: 5000,
            });
            this.form.reset();
            this.dialogRef.close();
          }
        } );
      }
      else if(val.riotID.length <= 0){
        this.snackBar.open('RiotID needs at least one character', 'Ok', {
          duration: 5000,
      });
    }
    else if(val.activity_ != "Competitive" && val.activity_ != "Unrated"){
      this.snackBar.open('Invalid Activity choice', 'Ok', {
        duration: 5000,
    });
    }
    else if(val.needMic != "Yes" && val.needMic != "No"){
      this.snackBar.open('Invalid "NeedsMic" value, please chose if a mic is needed', 'Ok', {
        duration: 5000,
    });
    }
    else{
      this.snackBar.open('Please choose a number above 0 for players needed', 'Ok', {
        duration: 5000,
    });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
