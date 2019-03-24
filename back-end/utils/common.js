function makeResult(data, opt) {
    let ret = {data: data, code: '1000', message: 'success'};
    Object.assign(ret, opt)
    return ret
}

module.exports = {
    makeResult
}