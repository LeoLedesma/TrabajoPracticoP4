
//Clase utilizada para el login de usuarios
export class UserAuth {
    
     constructor(        
        public email:string,
        public password:string
     ){}
}

//Clase utilizada para el registro de usuarios
export class UserRegister {
   
     constructor(
        public email:string,
        public password:string,
        public username:string
     ){}

}

//Clase utilizada para el uso sobre la aplicación.
export class User{
     constructor(
        public _id: string,
        public _idAuth: string,
        public email:string,        
        public username:string
     ){}
}
