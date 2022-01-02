import {updateObjByKey} from './util.service'

export const storageService = {
  query,
  get,
  post,
  postMany,
  put,
  putObj,
  remove,
  removeEntity
}

/**
 * @property {Function} query
 * @param {String} entityType 
 */

function query(entityType) {
  let entities = JSON.parse(localStorage.getItem(entityType) || '[]')
  return Promise.resolve(entities)
}

/**
 * @property {Function} get
 * @param {String} entityType 
 * @param {String} entityId 
 */

async function get(entityType, entityId) {
  const entities = await query(entityType)
  return entities.find(entity=>entity.id === entityId)
}

/**
 * @property {Function} post
 * @param {String} entityType 
 * @param {Object} newEntity 
 */

function post(entityType, newEntity) {
  newEntity.id = _makeId()
  return query(entityType).then((entities) => {
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
  })
}

/**
 * @property {Function} postMany
 * @param {String} entityType 
 * @param {Array} newEntities 
 */

function postMany(entityType, newEntities) {
  return query(entityType).then((entities) => {
    newEntities = newEntities.map((entity) => ({ ...entity, id: _makeId() }))
    entities.push(...newEntities)
    _save(entityType, entities)
    return newEntities
  })
}

/**
 * @property {Function} put
 * @param {String} entityType 
 * @param {Object} updatedEntity 
 */


function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity.id === updatedEntity.id)
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
  })
}

/**
 * 
 * @param {string} entityType 
 * @param {String} objKey 
 * @param {any} objVal 
 */

async function putObj(entityType, objKey, objVal ){
  let res = await query(entityType)
  res = updateObjByKey(res, objKey, objVal)
  _save(entityType, res)
  return res;
}

/**
 * @param {String} entityType 
 * @param {String} entityId 
 */

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity.id === entityId)
    entities.splice(idx, 1)
    _save(entityType, entities)
  })
}

/**
 * @param {String} entityType 
 */

 function removeEntity(entityType) {
  localStorage.removeItem(entityType)
}

/**
 * @property {Function} _save
 * @param {String} entityType 
 * @param {Array} entities 
 */

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}


/**
 * @property {Function} _makeId
 * @param {Number} length - the length of the string
 */


function _makeId(length = 5) {
  let text = ''
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
