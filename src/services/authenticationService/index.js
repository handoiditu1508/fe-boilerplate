import axios from "axios";

class AuthenticationService {
  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:3001/api",
      timeout: 5000
    })
  }

  async login(loginForm) {
    var response = await this.client.post("/login", loginForm);
    return response.data;
  }
}

export default new AuthenticationService();