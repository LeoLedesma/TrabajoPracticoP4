import { AbstractControl, AsyncValidatorFn} from "@angular/forms";
import { UsersService } from "src/app/services/users/users.service";

export function usernameExistsAsyncValidator(service: UsersService):AsyncValidatorFn{  

return (control:AbstractControl)=>{
    return service.existsUsername(control.value).then(exists => (exists ? null: { exists: true }));
  }
}

export function emailExistsAsyncValidator(service: UsersService):AsyncValidatorFn{  
  return (control:AbstractControl)=>{
      return service.existsEmail(control.value).then(exists => (exists ? null :{ exists: true }));
    }
  }
