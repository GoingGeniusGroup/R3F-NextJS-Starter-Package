import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function POST(request) {
  try {
    const data = await request.json()
    console.log(data)
    const { name, email } = data
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    })
    return NextResponse.json(newUser)
  } catch (error) {
    console.error('Error Creating User', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
