import axios from 'axios'
import he from 'he'
// import { config } from '../config/youtube.config'

const API_KEY = 'AIzaSyBEoFT-TYYIQIZEKjuqmTijepmPK2fe4Jw'

const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search'
const DETAILS_URL = 'https://www.googleapis.com/youtube/v3/videos'

export const youtubeService = {
  get,
  getDuration,
  getSongById,
  _titleSimplify,
  
}
/**
 * 
 * @param {String} query 
 * @returns {Promise<Object>}
 */
async function get(query) {
  try {
    const res = await axios.get(
      `${SEARCH_URL}?videoCategoryId=10&part=id,snippet&videoEmbeddable=true&type=video&maxResults=20&q=${query}&key=${API_KEY}`
    )
    return _getOrganizedRes(res.data)
  } catch (err) {
    console.dir(err)
  }
}

/**
 * 
 * @param {String} youtubeId 
 * @returns {Promise<Object>}
 */
async function getSongById(youtubeId) {
  try {
    const res = await axios.get(
      `${DETAILS_URL}?id=${youtubeId}&part=id,contentDetails,snippet&key=${API_KEY}`
    )
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

/**
 * 
 * @param {String} youtubeId 
 * @param {String} timeString 
 * @returns {Promise<any>}
 */
async function getDuration(youtubeId, timeString) {
  let duration
  if (!timeString) {
    try {
      let res = await axios.get(
        `${DETAILS_URL}?id=${youtubeId}&part=contentDetails&key=${API_KEY}`
      )
      duration = res.data.items[0].contentDetails.duration
    } catch (err) {
      console.log(err)
      throw err
    }
  } else duration = timeString
  try {
    duration = duration.substring(2)
    duration = duration.replace('M', ':')
    duration = duration.split(':')
    duration[1] = duration[1].replace('S', '')
    duration[1] = duration[1].padStart(2, '0')
    duration = duration.join(':')
    return duration.toString()
  } catch (err) {
    return null
  }
}


function _getOrganizedRes(res){
    return res.items.map(item=>{
        const {id} = item;
        const {title, description,thumbnails} = item.snippet
        return{ 
            id: id.videoId,
            title: _titleSimplify(title),
            description,
            imgUrl: thumbnails.medium.url
        }   
    })
}


function _titleSimplify(title) {
    // Removes HTML char codes
    let output = he.decode(title)
    // Removes 'Official Video' brackets
    const officialVideoRegex =
      /[([].?(official.?video)?(official music video)?.?[)\]]/gi
    output = output.replace(officialVideoRegex, '')
  
    return output
  }