import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './Validators/noSpaceAllowed.validator';
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
      firstname:new FormControl(null,[Validators.required,CustomValidators.noSpaceAllowed]),
      lastname:new FormControl(null,[Validators.required,CustomValidators.noSpaceAllowed]),
      email:new FormControl(null,[Validators.required,Validators.email],),
      username:new FormControl(null,Validators.required,CustomValidators.checkUsername),
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
      ]),
      experience:new FormArray([
       
      ])
    })
    this.reactiveForm.get('firstname')?.valueChanges.subscribe((value)=>{
      console.log(value) //we will get the value of what we type in the text box as we type
    }) //on control

    // this.reactiveForm.valueChanges.subscribe((value)=>{
    //   console.log(value)
    // }) On entire form
  }

  onFormSubmitted(){
    console.log(this.reactiveForm);
  }

  addSkill(){
    //We need to specify FormArray specifically bcs it has push method 
   ( <FormArray>this.reactiveForm.get('skills')).push(new FormControl(null,Validators.required))
  }

  deleteSkill(idx:number){
    const controls=(<FormArray>this.reactiveForm.get('skills'));

    controls.removeAt(idx);
  }

  addExperience(){
   const formgroup=new FormGroup({
        company:new FormControl(null),
        position:new FormControl(null),
        totalExp:new FormControl(null),
        startDate:new FormControl(null),
        endDate:new FormControl(null)
        });

        (<FormArray>this.reactiveForm.get('experience') ).push(formgroup) ;

      }

   deleteExp(idx:number){
    const grps=(<FormArray>this.reactiveForm.get('experience') );
    grps.removeAt(idx);
   }   
}