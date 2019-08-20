const sqlite = require("sqlite");
const path = require("path");

const formatData = async () => {
  try {
    const db = await sqlite.open(path.resolve(__dirname, "data/eve-data.sqlite"));
    const mapData = await db.get("SELECT * FROM mapSolarSystems WHERE solarSystemID = 30045354");
    console.log(mapData);
  } catch (error) {
    console.log(error);
  }
}

formatData();