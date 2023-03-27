import axios from "axios";
 
export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
    try {
    const {data:{data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
        {
            params: {
                bl_latitude: bl_lat ? bl_lat : '48.81556220872687',
                tr_latitude:tr_lat ? tr_lat : '48.90214747577797',
                bl_longitude: bl_lng ? bl_lng : '2.224219054341255',
                tr_longitude: tr_lng ? tr_lng : '2.469850925555473',
                limit: '30',
                currency: 'EURO',
                lunit: 'km',
                lang: 'en_FR'
              },
              headers: {
                'X-RapidAPI-Key': '70cb396bb0msh73166cb4c448786p13d286jsn46eee2c5eb3c',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
              }
        }
        );

        return data;
        
    } catch (error) {
        return null
        
    }
}