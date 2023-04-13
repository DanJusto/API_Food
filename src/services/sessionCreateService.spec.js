const SessionCreateService = require("./SessionCreateService");
const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("SessionCreateService", () => {
  let userRepository;
  let userCreateService;
  let sessionCreateService;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepository);
    sessionCreateService = new SessionCreateService(userRepository);
  });

  it("session should be created", async () => {
    const admin = {
      name: "Admin Test",
      email: "admin@test.com",
      password: "123456",
      is_admin: 1
    };
  
    await userCreateService.execute(admin);

    const session = {
      email: "admin@test.com",
      password: "123456"
    }
    
    const sessionCreated = await sessionCreateService.execute(session);

    expect(sessionCreated).toHaveProperty("token");
  });

  it("invalid e-mail", async () => {
    const admin = {
      name: "Admin Test",
      email: "admin@test.com",
      password: "123456",
      is_admin: 1
    };
  
    await userCreateService.execute(admin);

    const session = {
      email: "adminerr@test.com",
      password: "123456"
    }

    await expect(sessionCreateService.execute(session)).rejects.toEqual(new AppError("E-mail e/ou senha incorreta.", 401));
  });

  it("invalid password", async () => {
    const admin = {
      name: "Admin Test",
      email: "admin@test.com",
      password: "123456",
      is_admin: 1
    };
  
    await userCreateService.execute(admin);

    const session = {
      email: "admin@test.com",
      password: "123456789"
    }
    
    await expect(sessionCreateService.execute(session)).rejects.toEqual(new AppError("E-mail e/ou senha incorreta.", 401));
  });
});