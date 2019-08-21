const sqlite = require("sqlite");
const path = require("path");
const fs = require("fs");

const formatData = async () => {
  try {
    const db = await sqlite.open(path.resolve(__dirname, "data/eve-data.sqlite"));
    const mapData = await db.all(`SELECT solarSystemName as name, solarSystemID as id, regionID, security, x / 1e16 as x, y / 1e16 as y, z / 1e16 as z 
    FROM mapSolarSystems WHERE
    (
      x <= (SELECT xMax FROM mapUniverse WHERE universeID = 9) AND
      x >= (SELECT xMin FROM mapUniverse WHERE universeID = 9) AND
      y <= (SELECT yMax FROM mapUniverse WHERE universeID = 9) AND
      y >= (SELECT yMin FROM mapUniverse WHERE universeID = 9) AND
      z <= (SELECT zMax FROM mapUniverse WHERE universeID = 9) AND
      z >= (SELECT zMin FROM mapUniverse WHERE universeID = 9)
    )`);
    // const systems = mapData.map(sys => {
    //   return {
    //     name: sys.solarSystemName,
    //     id: sys.solarSystemID,
    //     regionID: sys.regionID,
    //     security: sys.security,
    //     x: sys.x / 1e17,
    //     y: sys.y / 1e17,
    //     z: sys.z / 1e17,
    //   };
    // });
    fs.writeFile(path.resolve(__dirname, "../src/data/map.json"), JSON.stringify(mapData, null, 2), err => console.log(err));
  } catch (error) {
    console.log(error);
  }
}

formatData();