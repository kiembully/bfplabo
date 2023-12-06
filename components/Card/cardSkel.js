import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Skeleton } from '@mui/material'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

const CardSkeleton = () => {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card sx={{
      width: '100%',
      padding: '5px'
    }}>
      <CardHeader
        avatar={
          <Skeleton variant="circular" width={40} height={40} />
        }
        action={
          <IconButton aria-label="settings" disabled>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        }
        subheader={
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        }
      />
      <Skeleton variant="rectangular" height={194} />
      <CardContent>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" disabled>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" disabled>
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          disabled
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  )
}
export default CardSkeleton
