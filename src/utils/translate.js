import i18nManager from '@/locales'

const locale = i18nManager.getLocale().split('-')[0]

const translateText = async (texts) => {
    try {
        const response = await fetch('http://144.24.206.46:5000/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                q: texts,
                source: 'en',
                target: locale
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

export default translateText