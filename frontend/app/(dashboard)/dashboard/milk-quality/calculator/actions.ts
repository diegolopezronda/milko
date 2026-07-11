"use server"
import { type IFormInputs } from "./types"

export async function getMilkQuality(formData:IFormInputs): Promise<boolean>{
  //const res = await fetch("https://milko.com/api/8000");
  //return res.json();
  console.log(formData);
  return (Math.round(Math.random()) == 1)
}