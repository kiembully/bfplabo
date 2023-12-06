import React from 'react'
import InfoIcon from '@mui/icons-material/Info'
import IconButton from '@mui/material/IconButton'
import Swal from 'sweetalert2'
import styles from '../components/Card/order.module.scss'

const currentDate = new Date()
export const INITIAL_STATE = {
  loading: false,
  step: 0,
  data: {
    typeOfService: 'writing',
    otherTypeOfService: '',
    subject: '',
    totalPage: 1,
    topic: '',
    details: '',
    sources: 0,
    academicLevel: 0,
    formatStyle: 0,
    paperType: 0,
    spacing: 0,
    otherSpacing: '',
    optionalNeeds: {
      chart: false,
      plagiarism: false,
      abstract: false
    },
    totalChart: 0,
    timezone: 0,
    deadline: currentDate.setDate(currentDate.getDate() + 1),
    // fileUpload: [],
    userId: 0,
    orderStatus: 'draft',
    isFullyPaid: false,
    orderNum: 0,
    price: 0,
    discountedPrice: 0
  },
  error: false,
  message: ''
}

export const PaymentStatusList = [
  { id: 0, status: 'Unpaid' },
  { id: 1, status: 'Pending Invoice' },
  { id: 2, status: 'Partially Paid' },
  { id: 3, status: 'Fully Paid' },
  { id: 4, status: 'Refunded' },
  { id: 5, status: 'Disputed' }
]

export const TypeOfServicesList = [
  'writing',
  'editing',
  'proofreading',
  'powerpoint'
  // 'other'
]

export const TypeOfServicesList2 = [
  { id: 'writing', text: 'Writing' },
  { id: 'editing', text: 'Editing' },
  { id: 'proofreading', text: 'Proofreading' },
  { id: 'powerpoint', text: 'Powerpoint' }
  // { id: 'other', text: 'Other' }
]

export const WritersAcademicLevelList = [
  { id: 0, text: 'Highschool' },
  { id: 1, text: 'College' },
  { id: 2, text: 'Master' },
  { id: 3, text: 'Ph.D' }
]

export const WritersAcademicLevelList2 = [
  { id: 0, text: 'highschool' },
  { id: 1, text: 'college' },
  { id: 2, text: 'bachelor' },
  { id: 3, text: 'professional' }
  // { id: 0, text: 'highschool' },
  // { id: 1, text: 'college' },
  // { id: 2, text: 'master' },
  // { id: 3, text: 'professional' }
]

export const TypeOfPaperList = [
  { id: 0, text: 'Any Type of Essay' },
  { id: 1, text: 'Assignment' },
  { id: 2, text: 'Annotated Bibliography' },
  { id: 3, text: 'Application Letter' },
  { id: 4, text: 'Article / Article Review' },
  { id: 5, text: 'Book Review' },
  { id: 6, text: 'Business Plan' },
  { id: 7, text: 'Case Study' },
  { id: 8, text: 'Charts' },
  { id: 9, text: 'Coursework' },
  { id: 10, text: 'Creative Writing' },
  { id: 11, text: 'CV / Resume' },
  { id: 12, text: 'Dissertation' },
  { id: 13, text: 'Lab Report' },
  { id: 14, text: 'Mathematics' },
  { id: 15, text: 'Presentation Speech' },
  { id: 16, text: 'Research Paper' },
  { id: 17, text: 'Report' },
  { id: 18, text: 'Term Paper' },
  { id: 19, text: 'Thesis Writing' },
  { id: 20, text: 'Other' }
]

export const SpacingList = [
  { id: 0, text: 'Single (600 words / Page)' },
  { id: 1, text: 'Double (300 words / Page)' }
  // { id: 2, text: 'Other' }
]

export const FormatingStyleList = [
  { id: 0, text: 'MLA' },
  { id: 1, text: 'APA' },
  { id: 2, text: 'Chicago / Turabian' },
  { id: 3, text: 'Harvard' },
  { id: 4, text: 'Other' }
]

export const DeadlineList = [
  { id: 0, text: '3 Hours' },
  { id: 1, text: '6 Hours' },
  { id: 2, text: '12 Hours' },
  { id: 3, text: '24 Hours' },
  { id: 4, text: '48 Hours' },
  { id: 5, text: '3 Days' },
  { id: 6, text: '4 Days' },
  { id: 7, text: '5 Days' },
  { id: 8, text: '7 Days' },
  { id: 9, text: '10 Days' },
  { id: 10, text: '14 Days' },
  { id: 11, text: '19 Days' }
]

export const TimezoneList = [
  { id: 0, text: 'America/Chicago' },
  { id: 1, text: 'America/New_York' },
  { id: 2, text: 'Europe/London' },
  { id: 3, text: 'Asia/Shanghai' },
  { id: 4, text: 'Asia/Singapore' },
  { id: 5, text: 'Australia/Sydney' }
]

export const OrderStatusList = [
  { id: 'draft', text: 'Draft', color: '#a7bcb9' },
  { id: 'invoice', text: 'For Invoicing', color: '#ffc436' },
  { id: 'in_progress', text: 'In Progress', color: '#97cba9' },
  { id: 'completed', text: 'Completed', color: '#bbe4e9' },
  { id: 'cancelled', text: 'Cancelled', color: '#e46161' },
  { id: 'revision', text: 'Revision', color: '#252b48' }
]

export const writingPricePerPageList = [
  {
    id: 0,
    deadline: '19 days',
    highschool: 7.95,
    college: 8.95,
    bachelor: 10.95,
    professional: 12.95
  },
  {
    id: 1,
    deadline: '14 days',
    highschool: 8.95,
    college: 9.95,
    bachelor: 11.95,
    professional: 13.95
  },
  {
    id: 2,
    deadline: '10 days',
    highschool: 9.95,
    college: 10.95,
    bachelor: 12.95,
    professional: 14.95
  },
  {
    id: 3,
    deadline: '7 days',
    highschool: 10.95,
    college: 11.95,
    bachelor: 13.95,
    professional: 15.95
  },
  {
    id: 4,
    deadline: '5 days',
    highschool: 11.95,
    college: 12.95,
    bachelor: 14.95,
    professional: 16.95
  },
  {
    id: 5,
    deadline: '4 days',
    highschool: 12.95,
    college: 13.95,
    bachelor: 15.95,
    professional: 17.95
  },
  {
    id: 6,
    deadline: '3 days',
    highschool: 13.95,
    college: 14.95,
    bachelor: 16.95,
    professional: 18.95
  },
  {
    id: 7,
    deadline: '48 hours',
    highschool: 14.95,
    college: 15.95,
    bachelor: 17.95,
    professional: 19.95
  },
  {
    id: 8,
    deadline: '24 hours',
    highschool: 16.95,
    college: 17.95,
    bachelor: 19.95,
    professional: 21.95
  },
  {
    id: 9,
    deadline: '12 hours',
    highschool: 18.95,
    college: 19.95,
    bachelor: 21.95,
    professional: 23.95
  },
  {
    id: 10,
    deadline: '6 hours',
    highschool: 22.95,
    college: 23.95,
    bachelor: 25.95,
    professional: 27.95
  },
  {
    id: 11,
    deadline: '3 hours',
    highschool: 26.95,
    college: 27.95,
    bachelor: 29.95,
    professional: 31.95
  }
]

export const editingPricePerPageList = [
  {
    deadline: '19 days',
    highschool: 3.95,
    college: 4.95,
    bachelor: 5.95,
    professional: 7.95
  },
  {
    deadline: '14 days',
    highschool: 4.95,
    college: 5.95,
    bachelor: 6.95,
    professional: 8.95
  },
  {
    deadline: '10 days',
    highschool: 5.95,
    college: 6.95,
    bachelor: 7.95,
    professional: 9.95
  },
  {
    deadline: '7 days',
    highschool: 6.95,
    college: 7.5,
    bachelor: 8.5,
    professional: 10.5
  },
  {
    deadline: '5 days',
    highschool: 6.95,
    college: 7.95,
    bachelor: 8.95,
    professional: 10.95
  },
  {
    deadline: '4 days',
    highschool: 6.95,
    college: 8.5,
    bachelor: 9.5,
    professional: 11.5
  },
  {
    deadline: '3 days',
    highschool: 7.95,
    college: 8.95,
    bachelor: 9.95,
    professional: 11.95
  },
  {
    deadline: '48 hours',
    highschool: 8.95,
    college: 9.95,
    bachelor: 10.95,
    professional: 12.95
  },
  {
    deadline: '24 hours',
    highschool: 9.95,
    college: 10.95,
    bachelor: 11.95,
    professional: 13.95
  },
  {
    deadline: '12 hours',
    highschool: 10.95,
    college: 11.95,
    bachelor: 12.95,
    professional: 14.95
  },
  {
    deadline: '6 hours',
    highschool: 12.95,
    college: 13.95,
    bachelor: 14.95,
    professional: 16.95
  },
  {
    deadline: '3 hours',
    highschool: 14.95,
    college: 15.95,
    bachelor: 16.95,
    professional: 18.95
  }
]

export const slidePricePerPageList = [
  {
    deadline: '19 days',
    highschool: 2.95,
    college: 3.95,
    bachelor: 4.95,
    professional: 6.95
  },
  {
    deadline: '14 days',
    highschool: 3.95,
    college: 4.95,
    bachelor: 5.95,
    professional: 7.95
  },
  {
    deadline: '10 days',
    highschool: 4.95,
    college: 5.95,
    bachelor: 6.95,
    professional: 8.95
  },
  {
    deadline: '7 days',
    highschool: 5.95,
    college: 6.95,
    bachelor: 7.95,
    professional: 9.5
  },
  {
    deadline: '5 days',
    highschool: 6.95,
    college: 7.95,
    bachelor: 8.95,
    professional: 9.95
  },
  {
    deadline: '4 days',
    highschool: 7.95,
    college: 8.95,
    bachelor: 9.95,
    professional: 10.95
  },
  {
    deadline: '3 days',
    highschool: 8.95,
    college: 9.95,
    bachelor: 10.95,
    professional: 11.95
  },
  {
    deadline: '48 hours',
    highschool: 9.95,
    college: 10.95,
    bachelor: 11.95,
    professional: 12.95
  },
  {
    deadline: '24 hours',
    highschool: 10.95,
    college: 11.95,
    bachelor: 12.95,
    professional: 13.95
  },
  {
    deadline: '12 hours',
    highschool: 11.95,
    college: 12.95,
    bachelor: 13.95,
    professional: 14.95
  },
  {
    deadline: '6 hours',
    highschool: 12.95,
    college: 13.95,
    bachelor: 14.95,
    professional: 15.95
  },
  {
    deadline: '3 hours',
    highschool: 13.95,
    college: 14.95,
    bachelor: 15.95,
    professional: 17.95
  }
]

export const rewritePricePerPageList = [
  {
    id: 0,
    deadline: '19 days',
    highschool: 5.95,
    college: 6.95,
    bachelor: 8.95,
    professional: 9.95
  },
  {
    id: 1,
    deadline: '14 days',
    highschool: 6.95,
    college: 7.95,
    bachelor: 9.95,
    professional: 10.95
  },
  {
    id: 2,
    deadline: '10 days',
    highschool: 7.95,
    college: 8.95,
    bachelor: 10.95,
    professional: 11.95
  },
  {
    id: 3,
    deadline: '7 days',
    highschool: 8.95,
    college: 9.95,
    bachelor: 11.95,
    professional: 12.95
  },
  {
    id: 4,
    deadline: '5 days',
    highschool: 9.95,
    college: 10.95,
    bachelor: 12.95,
    professional: 13.95
  },
  {
    id: 5,
    deadline: '4 days',
    highschool: 10.95,
    college: 11.95,
    bachelor: 13.95,
    professional: 14.95
  },
  {
    id: 6,
    deadline: '3 days',
    highschool: 11.95,
    college: 12.95,
    bachelor: 14.95,
    professional: 15.95
  },
  {
    id: 7,
    deadline: '48 hours',
    highschool: 12.95,
    college: 13.95,
    bachelor: 15.95,
    professional: 16.95
  },
  {
    id: 8,
    deadline: '24 hours',
    highschool: 13.95,
    college: 15.95,
    bachelor: 17.95,
    professional: 18.95
  },
  {
    id: 9,
    deadline: '12 hours',
    highschool: 14.95,
    college: 17.95,
    bachelor: 19.95,
    professional: 20.95
  },
  {
    id: 10,
    deadline: '6 hours',
    highschool: 18.95,
    college: 19.95,
    bachelor: 21.95,
    professional: 23.95
  },
  {
    id: 11,
    deadline: '3 hours',
    highschool: 21.95,
    college: 22.95,
    bachelor: 25.95,
    professional: 28.95
  }
]

const alertMessage = (type) => {
  if (type === 1) {
    Swal.fire({
      title: 'Pay in full',
      html: '<p>Get additional 20% discount when you pay upfront.</p>',
      icon: 'info',
      confirmButtonText: 'OK',
      confirmButtonColor: '#1976d2',
      customClass: {
        title: styles.customDialogTitle,
        text: styles.customDialogTitle
      }
    })
  } else {
    Swal.fire({
      title: 'Installment info',
      html: '<p>50% Downpayment required to start the service.</p>' +
            '<p>The remaining 50% will due upon completion.</p>',
      icon: 'info',
      confirmButtonText: 'OK',
      confirmButtonColor: '#1976d2',
      customClass: {
        title: styles.customDialogTitle,
        container: styles.customDialogTitle
      }
    })
  }
}

export const discountList = [
  {
    id: 0,
    text:
      <p style={{
        margin: 0,
        fontWeight: 'medium'
      }}>
        Pay in full <span style={{ color: 'orange' }}>(Recommended)</span>
        <IconButton
          sx={{ p: 0, verticalAlign: 'top', ml: '5px', opacity: 0.5 }}
          onClick={() => alertMessage(1)}
        >
          <InfoIcon style={{ fontSize: '22px' }} />
        </IconButton>
      </p>
  },
  {
    id: 1,
    text:
      <p style={{
        margin: 0
      }}>
        Pay in installments
        <IconButton
          sx={{ p: 0, verticalAlign: 'top', ml: '5px', opacity: 0.5 }}
          onClick={() => alertMessage(2)}
        >
          <InfoIcon style={{ fontSize: '22px' }} />
        </IconButton>
      </p>
  }
]
