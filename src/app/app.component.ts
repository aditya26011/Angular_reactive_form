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

    this.reactiveForm.get('username').statusChanges.subscribe((status)=>{
      console.log(status);
    })
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

   generateUsername(){
     let username = '';
    const fName: string= this.reactiveForm.get('firstname').value;
    const lName: string= this.reactiveForm.get('lastname').value;
    const dob: string= this.reactiveForm.get('dob').value;

    if(fName.length >= 3){
      username += fName.slice(0, 3);
    }
    else {
      username += fName;
    }

    if(lName.length >= 3){
      username += lName.slice(0, 3);
    }
    else {
      username += lName;
    }

    let datetime = new Date(dob);
    username += datetime.getFullYear();

    username = username.toLowerCase();

       this.reactiveForm.setValue({
      firstname: this.reactiveForm.get('firstname').value,
      lastname: this.reactiveForm.get('lastname').value,
      email: this.reactiveForm.get('email').value,
      username: username,
      dob: this.reactiveForm.get('dob').value,
      gender: this.reactiveForm.get('gender').value,
      address: {
        street: this.reactiveForm.get('address.street').value,
        country: this.reactiveForm.get('address.country').value,
        city: this.reactiveForm.get('address.city').value,
        region: this.reactiveForm.get('address.region').value,
        postal: this.reactiveForm.get('address.postal').value
      },
      skills: this.reactiveForm.get('skills').value,
      experience: this.reactiveForm.get('experience').value
    })

    //this.reactiveForm.get('username').setValue(username); set value on FormControl direct use


    this.reactiveForm.patchValue({
      username: username,
      address: {
        city: 'New Delhi'
      }
    })
   }
}