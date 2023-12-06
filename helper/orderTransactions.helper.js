export const handleOrderTransactionLog = (
  isEditing,
  status,
  writer,
  payStatus,
  upPrice,
  optBy
) => {
  const newDate = new Date()
  const newStatus = status
  let newAction = 'created'
  let newPaymentStatus = ''
  let newWriter = ''

  if (isEditing) {
    newAction = 'edited'
    newWriter = writer
    newPaymentStatus = payStatus
  } else {
    newAction = 'created'
    newPaymentStatus = false
    newWriter = ''
  }

  const transactionLog = {
    timestamp: newDate,
    action: newAction,
    status: newStatus,
    paymentStatus: newPaymentStatus,
    writer: newWriter,
    price: upPrice,
    operatedBy: optBy
  }

  return transactionLog
}

export const handlePaymentDetails = (payload) => {
  const newDate = new Date()

  const paymentDetails = {
    timestamp: newDate,
    orderId: payload.orderId,
    transactionId: payload.transactionId,
    bank: payload.bank,
    paymentType: payload.paymentType,
    amount: payload.amount,
    balance: payload.balance,
    invoiceUrl: payload.invoiceUrl,
    paymentStatus: payload.paymentStatus
  }

  return paymentDetails
}
