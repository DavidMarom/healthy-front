const axios = require ('axios')

export const utilService = {
    getLocation,
    calcAvgRate
  }
  

  

async function getLocation(address){
  //  let newAddress = addreess.split(' ').join('+')
    const API_KEY= 'AIzaSyCum5NI2ztcUbwjAyhLH98jAJHBK0gbugc';
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
    .then(res=> {
      const addreess = {
        lat: res.data.results[0].geometry.location.lat,
        lng:  res.data.results[0].geometry.location.lng,
        address:  res.data.results[0].address_components[0].short_name
      }
      return addreess
    })
    .catch(()=> console.log('NOTHING TO RETURN'))
  }
  

  function calcAvgRate(activity){
    let tempSum = 0;
    const rates = activity.reviews.map(review => review.rate);
    tempSum = rates.reduce(function (acc, val) {
      return acc + val
    }, 0);
    return ((Math.round((tempSum / rates.length) * 100) / 100).toFixed(2));
  }