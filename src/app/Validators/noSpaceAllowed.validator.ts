import { AbstractControl, FormControl } from "@angular/forms";

export class CustomValidators{
static noSpaceAllowed(control:FormControl){
    if(control.value!=null && control.value.indexOf(' ')!=-1){
        return {noSpaceAllowed:true};
    }
    return null; // if null no validation error on the formControl
}

static checkUsername(control:AbstractControl):Promise<any>{
//abstract control bcs FormGroup, FormArray and FormControl are its child classes
 return UserNameAllowed(control.value);
}
}
function UserNameAllowed(username:string) {
    const takenUsername=['johnsmith','manojjha','sarahking'];
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(takenUsername.includes(username)){
                resolve({checkedUsername:true})
            }
            else{
                resolve(null);
            }
        },5000)
    })
}
