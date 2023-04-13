const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const sqliteConnection = require("../database");

function validationAuth(request, response, next) {
    const authHeader = request.headers.authorization;
    
    if(!authHeader) {
        throw new AppError("JWT Token não informado", 401);
    }

    const [, token] = authHeader.split(" ");
    
    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret);

        request.user = {
            user_id: Number(user_id)
        };

        return next();
    } catch {
        throw new AppError("JWT Token inválido", 401);
    }
}

async function isAdmin(request, response, next) {
  const database = await sqliteConnection();

  const authHeader = request.headers.authorization;
    
  if(!authHeader) {
    throw new AppError("JWT Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");
    
  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      user_id: Number(user_id)
    };
  } catch {
    throw new AppError("JWT Token inválido", 401);
  }

  const isUserAdmin = await database.get("SELECT is_admin FROM users WHERE user_id = ?", [request.user.user_id])
  
  if(isUserAdmin.is_admin === 1){
      next();
  } else {
    throw new AppError("JWT Token não autorizado", 403);
  }
}

module.exports = { validationAuth, isAdmin };