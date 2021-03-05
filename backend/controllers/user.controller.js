exports.customerAccess = (req, res) => {
  res.status(200).send('Customer Content.')
}

exports.employeeAccess = (req, res) => {
  res.status(200).send('Employee Content.')
}
