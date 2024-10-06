let vehicles
import mongodb from "mongodb"
const ObjectID = mongodb.ObjectID

export default class VehiclesDAO {
  static async injectDB(conn) {
    if(vehicles){ 
      return
    } try {
      
      vehicles = await conn.db(process.env.VEHICLESREVIEWS_NS).collection('sadia_SB2823')
     
    } catch(e) {
      console.error(`unable to connect in VehiclesDAO: ${e}`)
    }
  }
  static async getVehicles({
    filters = null,
    page = 0,
    vehiclesPerPage = 20,
  } = {}) {
    let query = {}; // Initialize query as an empty object
  
    // Build the query based on filters
    if (filters) {
      console.info(filters);
      if ("VehicleTypeName" in filters) {
        // Use an exact match instead of $text
        query.VehicleTypeName = { $eq: filters['VehicleTypeName'] };
      }
      if ("MakeName" in filters) {
        query.MakeName = { $eq: filters['MakeName'] };
      }
    }
  
    let cursor;
    try {
      cursor = await vehicles
        .find(query)
        .limit(vehiclesPerPage)
        .skip(vehiclesPerPage * page);
      
      const vehiclesList = await cursor.toArray();
      const totalNumVehicles = await vehicles.countDocuments(query);
      return { vehiclesList, totalNumVehicles };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { vehiclesList: [], totalNumVehicles: 0 };
    }
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//   static async getVehicles({
//     filters = null,
//     page = 0,
//     vehiclesPerPage = 20,
//   } = {}) {
//     let query
//     // if(filters) {
//     //   console.info(filters)
//     //   if("VehicleTypeName" in filters) {
        
//     //     query = { $text: { $search: filters['VehicleTypeName']}}
//     //   } else if("MakeName" in filters) {
//     //     query = { "MakeName": { $eq: filters['MakeName']}}
//     // }
//     if (filters) {
//       console.info(filters);
//       if ("VehicleTypeName" in filters) {
//         // Use an exact match instead of $text
//         query.VehicleTypeName = { $eq: filters['VehicleTypeName'] };
//       }
//       if ("MakeName" in filters) {
//         query.MakeName = { $eq: filters['MakeName'] };
//       }
    
//  }
//  let cursor
//  try {
//    cursor = await vehicles
//      .find(query)
//      .limit(vehiclesPerPage)
//      .skip(vehiclesPerPage * page)
     
//    const vehiclesList = await cursor.toArray()
//    const totalNumVehicles = await vehicles.countDocuments(query)
//    return {vehiclesList, totalNumVehicles}
//  } catch(e) {
//    console.error(`Unable to issue find command, ${e}`)
//    console.error(e)
//    return { vehiclesList: [], totalNumVehicles: 0 }
//  }
// }

// static async getRatings() { 
//     let ratings = []
//     try {
//       ratings = await vehicles.distinct("rated")
//       return ratings
//     } catch(e) {
//       console.error(`unable to get ratings, ${e}`)
//       return ratings
//     }
//   }
  
  
}
