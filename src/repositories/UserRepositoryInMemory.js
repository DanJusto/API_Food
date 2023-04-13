class UserRepositoryInMemory {
  users = [];

  async findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  async create({ name, email, password, is_admin }) {

    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      email,
      name,
      password,
      is_admin
    };

    this.users.push(user);

    return user;
  }
}

module.exports = UserRepositoryInMemory;