export const api = async (endpoint) => {
    try {
      const response = await fetch(endpoint)
      const data = await response.json()
      return data;
    } catch (err) {
      console.error(err)
      throw err
    }
}
  