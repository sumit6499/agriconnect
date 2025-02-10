import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
export function middleware(req:NextRequest){
    if(req.cookies.get("isAuthenticated")?.value===undefined){
        return NextResponse.redirect(new URL('/login',req.url))
    }else{
        NextResponse.next()
    }
}
export const config={
    matcher: ['/dashboard','/marketplace']
}