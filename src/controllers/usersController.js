const UserCreateService = require("../services/UserCreateService");
const UserRepository = require("../repositories/UserRepository");

class UsersController {
  async create(request, response) {
    const { name, email, password, is_admin = 0 } = request.body;
    
    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({ name, email, password, is_admin });

    return response.status(201).json();
  }
}

module.exports = UsersController;