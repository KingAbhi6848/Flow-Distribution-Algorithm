import { ApplicationError } from "../Middleware/Error-Handling/applicationError.js";
import { v4 as uuidv4 } from "uuid";

const users = [];
const id = uuidv4();
export default class UserModel {
  constructor(name, email, password) {
    this.id = id,
    this.name = name,
    this.email = email,
    this.password = password
  }

  static register(name, email, password) {
    const newUser = new UserModel(name, email, password);
    users.push(newUser);
    return newUser;
  }

  static login(email, password) {
    const user = users.find(
      (user) => user.email == email && user.password == password
    );
    if (!user) {
      console.log("creadentials are wrong. check again");
      throw new ApplicationError("Invalid email or password", 401);
    }
    return user;
  }
}
