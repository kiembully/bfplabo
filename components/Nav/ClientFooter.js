import React from 'react'
import { Grid, Typography } from '@mui/material'
import Link from 'next/link'
import EmailIcon from '@mui/icons-material/Email'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import CopyrightIcon from '@mui/icons-material/Copyright'
import Image from 'next/image'

const ClientFooter = () => {
  return (
    <div style={{
      margin: '40px 0 0 0',
      backgroundColor: '#05595B',
      padding: '0 20px'
    }}>
      <Grid
        container
        spacing={0}
        textAlign={'center'}
        sx={{
          padding: '20px 0 30px 0',
          margin: 'auto',
          maxWidth: '1200px',
          textAlign: 'left',
          opacity: 0.8
        }}
      >
        <Grid item md={3} xs={12}>
          <Link href='/'>
            <div style={{
              // borderRadius: '7px',
              // border: '2px solid #fff',
              padding: '4px 10px',
              maxWidth: '200px',
              margin: 'auto'
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                minHeight: '75px'
              }}>
                <Image
                  src='/cleversally_logo.png'
                  fill
                  sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%, 100%"
                  alt='cleversally logo'
                />
              </div>
            </div>
          </Link>
        </Grid>
        <Grid item md={9} xs={12} sx={{
          color: '#fff',
          paddingBottom: '20px',
          '@media (max-width: 900px)': {
            textAlign: 'center'
          }
        }}>
          <Typography variant='h6' sx={{
            mb: 2,
            '@media (max-width: 900px)': {
              mt: 2
            }
          }}>
            How our service is utilized:
          </Typography>
          <Typography variant='p' sx={{
            fontSize: '14px'
          }}>
            Our experts&apos; notes are not meant to be shared as completed projects; they are strictly intended for research and study purposes. We do not support or approve of any form of plagiarism.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <hr style={{ opacity: 0.2, display: 'flex', width: '100%' }} />
        </Grid>
        <Grid item md={4} sm={6} xs={6}>
          <Typography
            variant='h6'
            sx={{
              color: '#fff'
            }}
          >
            Pages
          </Typography>
          <ul style={{
            listStyle: 'none',
            padding: 0
          }}>
            <li style={{
              margin: '10px 0'
            }}>
              <Link style={{
                textDecoration: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'light',
                ':hover': {
                  textDecoration: 'underline'
                }
              }} href='/guarantees'>Guarantees</Link>
            </li>
            <li style={{
              margin: '10px 0'
            }}>
              <Link style={{
                textDecoration: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'light',
                ':hover': {
                  textDecoration: 'underline'
                }
              }} href='/pricing'>Pricing</Link>
            </li>
            <li style={{
              margin: '10px 0'
            }}>
              <Link style={{
                textDecoration: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'light',
                ':hover': {
                  textDecoration: 'underline'
                }
              }} href='/reviews'>Reviews</Link>
            </li>
            <li style={{
              margin: '10px 0'
            }}>
              <Link style={{
                textDecoration: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'light',
                ':hover': {
                  textDecoration: 'underline'
                }
              }} href='/contact-us'>Contact Us</Link>
            </li>
            <li style={{
              margin: '10px 0'
            }}>
              <Link style={{
                textDecoration: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'light',
                ':hover': {
                  textDecoration: 'underline'
                }
              }} href='/about-us'>About Us</Link>
            </li>
          </ul>
        </Grid>
        <Grid item md={4} sm={6} xs={6}>
          <Typography
            variant='h6'
            sx={{
              color: '#fff'
            }}
          >
            Services
          </Typography>
          <ul style={{
            listStyle: 'none',
            padding: 0
          }}>
            <li style={{
              margin: '10px 0'
            }}>
              <Link style={{
                textDecoration: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'light',
                ':hover': {
                  textDecoration: 'underline'
                }
              }} href='/guarantees'>Assignment Writing</Link>
            </li>
            <li style={{
              margin: '10px 0'
            }}>
              <Link style={{
                textDecoration: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'light',
                ':hover': {
                  textDecoration: 'underline'
                }
              }} href='/pricing'>Same Day Essay</Link>
            </li>
            <li style={{
              margin: '10px 0'
            }}>
              <Link style={{
                textDecoration: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'light',
                ':hover': {
                  textDecoration: 'underline'
                }
              }} href='/reviews'>Write Research Paper</Link>
            </li>
            <li style={{
              margin: '10px 0'
            }}>
              <Link style={{
                textDecoration: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'light',
                ':hover': {
                  textDecoration: 'underline'
                }
              }} href='/contact-us'>Write My Speech</Link>
            </li>
            <li style={{
              margin: '10px 0'
            }}>
              <Link style={{
                textDecoration: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'light',
                ':hover': {
                  textDecoration: 'underline'
                }
              }} href='/about-us'>Case Study Help</Link>
            </li>
            <li style={{
              margin: '10px 0'
            }}>
              <Link style={{
                textDecoration: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'light',
                ':hover': {
                  textDecoration: 'underline'
                }
              }} href='/about-us'>Coursework Help</Link>
            </li>
          </ul>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Typography
            variant='h6'
            sx={{
              color: '#fff'
            }}
          >
            Contact Us
          </Typography>
          <ul style={{
            listStyle: 'none',
            padding: 0
          }}>
            <li style={{
              margin: '10px 0'
            }}>
              <Link type='email' style={{
                textDecoration: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'light',
                display: 'flex',
                alignItems: 'center'
              }} href='mailto:support@cleversally.com'>
                <EmailIcon sx={{ mr: 1 }} />
                support@cleversally.com
              </Link>
            </li>
          </ul>
          <Typography
            variant='h6'
            sx={{
              color: '#fff'
            }}
          >
            Follow Us
          </Typography>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            maxWidth: '300px'
          }}>
            <li style={{
              margin: '10px 0',
              flex: 'auto'
            }}>
            <Link style={{
              textDecoration: 'none',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 'light',
              display: 'flex',
              alignItems: 'center'
            }} href='/'>
              <FacebookIcon />
            </Link>
            </li>
            <li style={{
              margin: '10px 0',
              flex: 'auto'
            }}>
            <Link style={{
              textDecoration: 'none',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 'light',
              display: 'flex',
              alignItems: 'center'
            }} href='/'>
              <TwitterIcon />
            </Link>
            </li>
            <li style={{
              margin: '10px 0',
              flex: 'auto'
            }}>
            <Link style={{
              textDecoration: 'none',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 'light',
              display: 'flex',
              alignItems: 'center'
            }} href='/'>
              <InstagramIcon />
            </Link>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyItems: 'center',
          alignItems: 'center'
        }}>
            <hr style={{ opacity: 0.2, display: 'flex', width: '100%' }} />
            <Typography
            variant='p'
            sx={{
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              fontSize: '12px',
              marginTop: '20px'
            }}
            >
              <CopyrightIcon style={{ fontSize: 'inherit' }} />
              2023, CleverSally, All rights reserved.
            </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default ClientFooter
