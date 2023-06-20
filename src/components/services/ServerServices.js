import axios from "axios"
const ServerURL='http://localhost:5000'

const getData=async(url)=>{
  var response=await axios.get(`${ServerURL}/${url}`)
  var result=response.data
 try{
  return result
 }
 catch(e){
  return null
 }
}

 const postData=async(url,body)=>{
  var response=await axios.post(`${ServerURL}/${url}`,body)
  var result=response.data

  try{
    return result
  }
  catch(e)
  {
    return null
  }
}








export {ServerURL,getData,postData}