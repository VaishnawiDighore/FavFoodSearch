import axios from 'axios'

const Req =  axios.create({
    baseURL:"https://api.edamam.com/api/recipes/v2",
    timeout:10000,
    params:{
        app_id:"7fafefd7",
        app_key:"f488e270a4e903961162c4d45569ee4f",
        type:"public",          
    }
});

export {Req};