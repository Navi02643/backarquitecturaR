process.env.PORT = process.env.PORT || 5000;
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

if (process.env.NODE_ENV === "dev") {
  process.env.URLDB =
    "mongodb+srv://Navi026:ADMIN1234@cluster0.4xzwi.mongodb.net/SistemaGestion?retryWrites=true&w=majority";
} else {
  process.env.URLDB =
    "mongodb+srv://Navi026:ADMIN1234@cluster0.4xzwi.mongodb.net/SistemaGestion?retryWrites=true&w=majority";
}

process.middlewares = [];