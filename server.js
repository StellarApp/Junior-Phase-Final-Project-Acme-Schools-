const app = require("./app");
const PORT = process.env.PORT || 4000;
const db = require("./db");

db.syncAndSeed()
  .then(() => app.listen(PORT, () => console.log(`Listening on port ${PORT}`)))
  .catch(ex => console.log(ex));
