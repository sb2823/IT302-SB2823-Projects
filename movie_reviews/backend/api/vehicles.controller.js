//SadiaBarlas, 10/06/2024, IT302-451, Phase02 and sb2823@njit.edu.
import VehiclesDAO from '../dao/vehiclesDAO.js'
export default class vehiclesController {
  static async apiGetVehicles(req,res,next) {
    const vehiclesPerPage = req.query.vehiclesPerPage ? parseInt(req.query.vehiclesPerPage) : 20
    const page = req.query.page ?   parseInt(req.query.page) : 0
    let filters = {}
    if(req.query.MakeName){
      filters.MakeName = req.query.MakeName
    } else if(req.query.VehicleTypeName){
      filters.VehicleTypeName = req.query.VehicleTypeName
    }
    const { vehiclesList, totalNumVehicles } = await VehiclesDAO.getVehicles({
        filters, page, vehiclesPerPage})
    
        let response = {
          vehicles: vehiclesList,
          page: page,
          filters: filters,
          entries_per_page: vehiclesPerPage,
          total_results: totalNumVehicles,
        }
        res.json(response)
       }
    }
    
