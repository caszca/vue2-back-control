const dayjs = require("dayjs")
function format(date) {
    return dayjs(date).format('YYYY-MM-DD')
}

module.exports = format