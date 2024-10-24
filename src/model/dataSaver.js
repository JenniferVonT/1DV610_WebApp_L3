/**
 * The module that handles saving data in the localstorage.
 *
 * @author Jennifer von Trotta-Treyden <jv222th>
 * @module src/model/dataSaver.js
 * @version 1.0.0
 */

export default class DataSaver {
  #maxStorageValues = 5

  saveChart (id, data) {
    const stringifiedData = JSON.stringify(data)
  
    if (localStorage.length < this.#maxStorageValues || this.#isChartAlreadySaved) {
      localStorage.setItem(id, stringifiedData)
    }
  }

  getSavedChart (id) {
    const savedChart = {}

    savedChart.id = id
    savedChart.payload = JSON.parse(localStorage.getItem(id))

    return savedChart
  }

  getAllSavedCharts () {
    const savedItems = []

    for (let i = 0; i < this.#maxStorageValues; i++) {
      const key = localStorage.key(i)
      const value = localStorage.getItem(key)

      if (key && value) {
        savedItems[i] = {
          id: key,
          payload: JSON.parse(value)
        }
      }
    }

    return savedItems
  }

  deleteChart (id) {
    localStorage.removeItem(id)
  }
  
  createUniqueID () {
    let id
    do {
      const generatedId = this.#generateID()

      if (generatedId !== NaN && !this.#isChartAlreadySaved(generatedId)) {
        id = generatedId
      }
    } while (!id)

      return id
  }

  #generateID () {
    const randomValues = window.crypto.getRandomValues(new Uint8Array(3))
    let randomValueString = randomValues.toString()
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

    randomValueString = randomValueString.replace(',', letters[parseInt(randomValueString.charAt(0))])
    const id = randomValueString.replace(',', letters[parseInt(randomValueString.charAt(1))])

    return id
  }

  #isChartAlreadySaved (id) {
    const savedId = localStorage.getItem(id)

    if (savedId) {
      return true
    }
    return false
  }
}
