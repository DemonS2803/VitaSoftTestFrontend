import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.css']
})
export class LkComponent implements OnInit{

  currentRole: string = localStorage.getItem("currentRole") || "";
  login: string = localStorage.getItem("login") || "";
  ngOnInit(): void {

  }

}
