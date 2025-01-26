import { v4 as uuidv4 } from "uuid";
import { ApplicationError } from "../Middleware/Error-Handling/applicationError.js";

const id = uuidv4();

export default class astroModel{

  constructor(id , name,email,password){
    this.id = id,
    this.name = name,
    this.email = email,
    this.password = password
  }
 
  static register(name,email,password){
    const newAstro  =  new astroModel(name,email,password);
    astrologers.push(newAstro);
    return newAstro;
  }

  static login(email,password){
    const user = astrologers.find(astro => astro.email == email && astro.password == password);
    if(!user){
      console.log("creadentials are wrong. check again");
      throw new ApplicationError("Invalid email or password", 401);
    }
    return user;
  }
}


const astrologers = [];
