const createError2 = message => status => fieldError => {
    const field = { field: undefined }
    if (fieldError !== '') {
        field.field = fieldError
    }
    const error = new Error(message)
    error.status = status
    error.field = field.field
    throw error
}

// ลงมาแก้ให้ใส่ค่าเข้ามาง่ายกว่านี้ดู 

module.exports = createError2