import Footer from './components/Footer/Footer'
import Form from './components/Form/Form'
import {
  LdBgCells,
  LdNotification,
  LdTypo,
} from '@emdgroup-liquid/liquid/dist/react'
import * as React from 'react'

const successMessages = [
  'Nice! 👍',
  'Aaaweeesome! 🙌',
  'Rock on! 🤘',
  'How cool is that?! 😎',
  'Rad! 🤓',
  'Supersonic! ⚡️',
  'Magic! ✨',
  'Groovy baby! 🕺',
  'Lovely! 🥰',
  'Smooth! 💆‍♀️',
  'Mind-blowing! 🤯️',
  'Excellent! 👌️',
  'Delicious! 🤤️',
  'Outa space! 👽',
]

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = React.useState<string>('ocean')
  const handleChangeTheme = React.useCallback((theme: string) => {
    setCurrentTheme(theme)
    setTimeout(() => {
      const content = successMessages.shift()
      dispatchEvent(new CustomEvent('ldNotificationClear'))
      if (!content) return
      dispatchEvent(
        new CustomEvent('ldNotificationAdd', {
          detail: {
            content: content,
            type: 'info',
            timeout: 2000,
          },
        })
      )
      successMessages.push(content)
    }, 500)
  }, [])

  return (
    <div
      style={{ minWidth: '20rem' }}
      className={`flex flex-col min-h-screen ld-theme-${currentTheme}`}
    >
      <LdNotification placement="bottom" />
      <main
        className="relative flex items-center"
        style={{ minHeight: '80vh' }}
      >
        <LdBgCells className="block absolute inset-0" />
        <div className="container mx-auto px-ld-24 pt-ld-40 pb-24 relative max-w-2xl">
          <LdTypo variant="b1" className="text-thm-warning mb-ld-40">
            Liquid Sandbox App
          </LdTypo>
          <Form onChangeTheme={handleChangeTheme} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
