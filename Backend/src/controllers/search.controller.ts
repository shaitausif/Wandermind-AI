import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";
import { Request, Response } from "express";
import { AIResponse } from "../gemini";
import axios from 'axios'
import { AsyncLocalStorage } from "async_hooks";




export const searchTrip = asyncHandler(async(req: Request, res: Response) => {
    const { placeName } = req.body;

    if(!placeName || placeName.trim() == '') throw new ApiError(400, "PlaceName is required")

    const response  = await AIResponse(placeName)
    

    const placesArray = extractPlacesFromLLM(response!)
    



//     const placesWithCoords = await Promise.all(
//   placesArray.map(async (place: any) => {
//     const coords = await getCoordinates(place.name);
//     console.log(coords)
//     return {
//       ...place,
//       // @ts-ignore
//       lat: coords?.lat,
//       // @ts-ignore
//       lng: coords?.lon,
//     };
//   })
// );


    
    return res.status(200).json(new ApiResponse(200, placesArray, "Places to visit fetched successfully."))

})



function extractPlacesFromLLM(rawString: string) {
  // Remove ```json, ``` and any newlines/spaces around
  const cleaned = rawString
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  // Parse JSON safely
  const parsed = JSON.parse(cleaned);

  // Return array of places
  return parsed.places;
}




//   export async function getCoordinates(place: string) {
//   const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=json`);
//   console.log("HOYE")
//   const data = await res.json();
  

//   return { lat: data[0].lat, lon: data[0].lon };
 
// }

    
