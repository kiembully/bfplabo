import { useEffect } from 'react'
import Chatra from '@chatra/chatra'
import { useRouter } from 'next/router'

const ChatraIO = () => {
  const config = {
    setup: {
      buttonSize: 50,
      chatHeight: 350
    },
    integration: {
      name: 'Clever Sally',
      email: 'kimklintonvale@gmail.com',
      /* any number of custom properties */
      'What does he do': 'Goes to Oz with his friends'
    },
    ID: 'FH68Kwrdeh2jt3bgD'
  }

  const router = useRouter()
  useEffect(() => {
    if (router.asPath === '/') {
      Chatra('init', config)
    }
  }, [router])
}

export default ChatraIO
