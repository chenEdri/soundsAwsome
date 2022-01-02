
export const utilService = {
  getRandomColor,
  getRandomNumber,
  findIdxById,
  findIdxByName,
  getDispatchForFilter,
}

/**
 * @property {Function} getRandomColor
 * @returns {String} -random color
 */

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

/**
 * @property {Function} getRandomNumber
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Number} - random number
 */

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

/**
 * @property {Function} findIdxById
 * @param {Array<any>} arr 
 * @param {String} id - Key to find the item with it 
 * @returns {Number} - The index number or -1 if nothing to return
 */

function findIdxById(arr, id) {
  return arr.findIndex((item) => item.id === id)
}

/**
 * @property {Function} findIdxByName
 * @param {Array<any>} arr 
 * @param {String} name - Key to find the item with it 
 * @returns {Number} - The index number or -1 if nothing to return
 */

function findIdxByName(arr, name) {
  return arr.findIndex((item) => item.name === name)
}


function getDispatchForFilter(ev) {
  const { value, name } = ev.target
  const type = `SET_${name}`
  switch (name) {
    case 'TITLE':
      return { type, title: value }
    case 'OWNER':
      return { type, owner: value }
    // case 'PAGE':
    //   return { type, page: value }
    default:
      return null
  }
}

export function getTotalPages(total, number = 6) {
  return Math.ceil(+total / +number)
}

export function getSongsToShow(page, songs, count = 6) {
  const index = page !== 0 ? (page - 1) * count : page * count
  let res = { index, songsToShow: songs.slice(index, index + count) }
  return res
}

/**
 * @property {Function} getObjectKey - get case string from the reducer and reuturn it to the key name as it defined in the state object
 * @param {String} key 
 * @returns {String} - the key in the property type
 */

export function getObjectKey(key) {
 //@ts-ignore
 //ignoring the internal Typescript error of Regex 
  return key.toLowerCase().replace(/_/.g, (char) => char[1].toUpperCase())
}

/**
 * @property {Function} updateObjByKey - updating the object value by key 
 * @param {Object} obj 
 * @param {String} key 
 * @param {any} val 
 * @returns {Object}
 */
export function updateObjByKey(obj, key, val) {
  return { ...obj, [key]: val }
}

/**
 * @property {Function} addToExlusiveArr - Adding item to the array only if it is not exist yet
 * @param {Array<any>} arr 
 * @param {any} item 
 * @returns 
 */

export function addToExlusiveArr(arr, item) {
  const set = new Set(arr)
  set.add(item)
  return [...set]
}

/**
 * using object map in order to run O-N and get the same exlusive arr
 * @property {Function} getExclusiveArr
 * @param {Array<any>} arr
 * @return {Array<Object>} -returning array without repeating items
 */
export function getExclusiveArr(arr) {
  let objMap = arr.reduce((acc, item) => {
    if (!acc[item.id]) acc[item.id] = item
    return acc
  }, {})
  return Object.values(objMap)
}
