const checkTranslateApi = async () => {
    try {
        const response = await fetch('http://144.24.206.46:5000',
            {
                method: 'GET'
            })

        if (response.ok) {
            return true
        }

        return false

    } catch (error) {
        console.error('Error:', error)
        return false
    }
}

const translateText = async (texts, language) => {
    try {
        const response = await fetch('http://144.24.206.46:5000/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                q: texts,
                source: 'en',
                target: language.split('-')[0]
            })
        })
    
        if (response.ok) {
            const data = await response.json()
            return data.translatedText
        }

        return texts
    } catch (error) {
        console.error('Error:', error)
        return texts
    }
}

export { checkTranslateApi }
export default translateText