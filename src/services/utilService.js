const axios = require ('axios')

export const utilService = {
    getLocation
  }
  

  

async function getLocation(addreess){
    const API_KEY= 'AIzaSyCum5NI2ztcUbwjAyhLH98jAJHBK0gbugc';
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addreess}&key=${API_KEY}`)
    .then(res=> console.log(res.data))
    .catch(()=> console.log('NOTHING TO RETURN'))
  }
  