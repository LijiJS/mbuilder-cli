const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const rm = require('rimraf').sync

module.exports = function(metadata = {}, src, dest = '.'){
    if(!src){
        return Promise.reject(new Error(`invalid source: ${src}`))
    }
    return new Promise((resolve, reject) => {
        Metalsmith(process.cwd())
            .metadata(metadata)
            .clean(false)
            .source(src)
            .destination(dest)
            .use((files, metalsmith, done) => {
                const meta = metalsmith.metadata()
                Object.keys(files).forEach(fileName => {
                    const t = files[fileName].contents.toString()
                    files[fileName].contents = Buffer.from(Handlebars.compile(t)(meta))
                })
                done()
            }).build(err => {
            rm(src)
            err ? reject(err) : resolve({ dest })
        })
    })
}