import React from 'react'
import Link from 'next/link'
import { Button } from '@mui/material'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const CommonLink = ({ children, ...props }) => {
  const {
    btnStyle,
    linkStyle,
    path,
    label,
    variant
  } = props

  const router = useRouter()

  return (
    <div style={{ flex: 'auto' }}>
      <Link
        style={ linkStyle && linkStyle(path, router.pathname) }
        href={`${path}`}
        aria-label={label}>
        <Button
        sx={btnStyle}
        variant={variant}
        aria-label="orders">
          {children}
        </Button>
      </Link>
    </div>
  )
}

CommonLink.propTypes = {
  children: PropTypes.any,
  btnStyle: PropTypes.any,
  linkStyle: PropTypes.func,
  path: PropTypes.string,
  variant: PropTypes.string,
  label: PropTypes.string
}

export default CommonLink
