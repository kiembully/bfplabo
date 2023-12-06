import React from 'react'
import CommonLink from '../LinkButton'

const GuestLanding = () => {
  return (
    <div style={{
      maxWidth: 450,
      textAlign: 'center',
      margin: 'auto'
    }}>
      <h2 style={{
        marginTop: 70,
        marginBottom: 70
      }}>You will have this feature once you&apos;re logged in.</h2>
      <CommonLink
        path='/login'
        label='Login'
        variant='contained'
      >
        Login
      </CommonLink>
    </div>
  )
}

export default GuestLanding
