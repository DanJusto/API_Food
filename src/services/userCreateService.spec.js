const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("UserCreateService", () => {
  let userRepository;
  let userCreateService;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepository);
  });

  it("admin should be created", async () => {
    const admin = {
      name: "Admin Test",
      email: "admin@test.com",
      password: "123456",
      is_admin: 1
    };
  
    const adminCreated = await userCreateService.execute(admin);
  
    expect(adminCreated).toHaveProperty("id");
  });

  it("user should be created", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123456"
    };
  
    const userCreated = await userCreateService.execute(user);
  
    expect(userCreated).toHaveProperty("id");
  });

  it("user should not be created with exists email", async () => {
    const user1 = {
      name: "User Test 1",
      email: "user1@test.com",
      password: "123456"
    };

    const user2 = {
      name: "User Test 2",
      email: "user1@test.com",
      password: "123456"
    };

    await userCreateService.execute(user1);

    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso."));

  })
});