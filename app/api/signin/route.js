import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    // Find the user by email
    const user = await prisma.users.findUnique({
      where: { email },
    })

    // Check if user exists
    if (!user) {
      // If user doesn't exist, return error indicating incorrect email
      return NextResponse.error('Incorrect email', 401)
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      // If password doesn't match, return error indicating incorrect password
      return NextResponse.error('Incorrect password', 401)
    }
    // return NextResponse.json({ message: 'Sign-in successful', user })
    // // If email and password are correct, redirect to home page//////////////////////////////////////use this later
    // return NextResponse.redirect('/home', {
    //   body: JSON.stringify({ message: 'Sign-in successful' }),
    // })
    const absoluteURL = new URL('/createavatar', 'http://localhost:3000/createavatar')
    absoluteURL.searchParams.set('http://localhost:3000/signin', request.nextUrl.pathname)
    return NextResponse.redirect(absoluteURL.toString())
  } catch (error) {
    console.error('Error signing in:', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
