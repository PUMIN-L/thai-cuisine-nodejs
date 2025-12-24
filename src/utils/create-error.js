const createError = detail => {
    const error = new Error(detail.message)
    error.status = detail.statusCode
    error.field = detail.field
    throw error
}

// ลงมาแก้ให้ใส่ค่าเข้ามาง่ายกว่านี้ดู 

module.exports = createError