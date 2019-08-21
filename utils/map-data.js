const sqlite = require("sqlite");
const path = require("path");
const fs = require("fs");

const formatData = async () => {
  try {
    const db = await sqlite.open(path.resolve(__dirname, "data/eve-data.sqlite"));
    const mapData = await db.all("SELECT * FROM mapSolarSystems");
    const systems = mapData.map(sys => {
      return {
        name: sys.solarSystemName,
        id: sys.solarSystemID,
        regionID: sys.regionID,
        security: sys.security,
        x: sys.x,
        y: sys.y,
        z: sys.z,
      };
    });
    fs.writeFile(path.resolve(__dirname, "data/map.json"), JSON.stringify(systems, null, 2), err => console.log(err));
  } catch (error) {
    console.log(error);
  }
}

formatData();