var {pathToRegexp} = require('path-to-regexp')

let pathname = '/dashboard/20/50/test'
let key = []
let res = pathToRegexp('/dashboard/:userId/:contestId',key,{end:false})
let match = res.exec(pathname)

// console.log(vals)

let params = {}

console.log(match,res)
if(match)
key.forEach((a,i)=> params[a.name] = match[i+1] )


if(!match){
    return null
}

const [url, ...values] = match
console.log(pathname,url, pathname===url)