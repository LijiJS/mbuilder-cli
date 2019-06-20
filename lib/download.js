const download = require('download-git-repo')
const path = require('path')
const ora = require('ora')

module.exports = function (url, target) {
    target = path.join(target || '.', target)
    return new Promise(function(resolve, reject){
        console.log('\n')
        const spinner = ora(`正在构建模板……\n`)
        spinner.start()
        download(url, target, (err) => {
            if (err) {
                spinner.fail()
                reject(err)
            } else {
                spinner.succeed()
                resolve(target)
            }
        })
    })
}