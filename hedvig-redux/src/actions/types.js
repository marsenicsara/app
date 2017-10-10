const typesList = [
  "API",
  "UPLOAD",
  "AUTHENTICATE",
  "LOADED_MESSAGES",
  "LOADED_ONBOARDING",
  "GET_INSURANCE",
  "LOADED_INSURANCE",
  "REMOVE_PERIL",
  "ADD_PERIL",
  "PERIL_REMOVED",
  "PERIL_ADDED",
  "CREATED_QUOTE",
  "CREATED_CLAIM",
  "CHOICE_SELECTED",
  "SET_RESPONSE_VALUE",
  "SEND_CHAT_RESPONSE",
  "UPDATE_ITEM",
  "ITEM_UPDATED",
  "GET_ASSETS",
  "LOADED_ASSETS",
  "LOADED_USER",
  "LOADED_CASHBACK_ALTERNATIVES",
  "STATUS_MESSAGE",
  "UPDATE_CASHBACK"
]

const typesMap = {}
typesList.forEach(t => (typesMap[t] = t))

module.exports = typesMap
