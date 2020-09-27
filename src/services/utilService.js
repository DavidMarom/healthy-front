const axios = require ('axios')

export const utilService = {
    getLocation
  }
  

  

async function getLocation(addreess){
   let newAdress = addreess.split(' ').join('+')
    const API_KEY= 'AIzaSyCum5NI2ztcUbwjAyhLH98jAJHBK0gbugc';
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${newAdress}&key=${API_KEY}`)
    .then(res=> {
      return {
        lat: res.data.geometry.location.lat,
        lng:  res.data.geometry.location.lng,
        address:  res.data.address_components.short_name
      }
    })
    .catch(()=> console.log('NOTHING TO RETURN'))
  }
  