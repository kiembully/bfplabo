import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const InfiniteScroll = ({ children, ...props }) => {
  const {
    updateData
  } = props

  useEffect(() => {
    function handleScroll () {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollPosition = window.scrollY

      if (windowHeight + scrollPosition >= documentHeight) {
        // Call your function here when the user reaches the bottom
        // For example, you can call your custom function like this:
        // yourFunction()
        if (typeof updateData !== 'undefined') {
          updateData()
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div>
      {children}
    </div>
  )
}

InfiniteScroll.propTypes = {
  children: PropTypes.any,
  updateData: PropTypes.func
}

export default InfiniteScroll
