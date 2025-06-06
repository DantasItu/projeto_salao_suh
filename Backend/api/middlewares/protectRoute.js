import jwt from "jsonwebtoken";

// verifica se o token é valido e o type registrado nele caso precise restrigir alguma pagina.
const protectRoute = (...allowedTypes) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Token não fornecido ou mal formatado" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (allowedTypes.length > 0 && !allowedTypes.includes(decoded.type)) {
        return res
          .status(403)
          .json({ message: "Acesso negado: tipo de usuário não autorizado" });
      }

      next();
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Token inválido ou expirado", error: err.message });
    }
  };
};

export default protectRoute;
