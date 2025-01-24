import {PrismaClient} from '@prisma/client'

declare global{
    var globalClientCache:PrismaClient
}


let prismaclient:PrismaClient
export const initPrismaClient=()=>{
    if(process.env.NODE_ENV=="production"){
        prismaclient=new PrismaClient({log:['query','error']})
    }else{
        if(!global.globalClientCache)
            prismaclient=new PrismaClient({log:['query','error']})
        else
            prismaclient=globalClientCache
    }
    return prismaclient
}

export const db=initPrismaClient()