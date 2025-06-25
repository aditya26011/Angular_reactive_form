import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-reactive-form';

  reactiveForm:FormGroup;

  ngOnInit(): void {
    this.reactiveForm=new FormGroup({
      firstname:new FormControl(null,Validators.required),
      lastname:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email],),
      username:new FormControl(null),
      gender:new FormControl('male'),
      dob:new FormControl(null),
      address:new FormGroup({
        street:new FormControl(null,Validators.required),
      country:new FormControl('India',Validators.required),
      city:new FormControl(null,Validators.required),
      region:new FormControl(null),
      postal:new FormControl(null,Validators.required),
      }),
      skills:new FormArray([
       new FormControl(null,Validators.required),
       new FormControl(null,Validators.required),
       new FormControl(null,Validators.required),
      ])
    })
  }

  onFormSubmitted(){
    console.log(this.reactiveForm);
  }
}