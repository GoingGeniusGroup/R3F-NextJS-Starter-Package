import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//Function to create user
export async function POST(request) {
  try {
    const data = await request.json()
    console.log(data)
    const { first_name, last_name, email, phone_number } = data
    const newUser = await prisma.users.create({
      data: { first_name, last_name, email, phone_number },
    })
    return NextResponse.json(newUser)
  } catch (error) {
    console.error('Error Creating User', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

//Function to read user
export async function GET() {
  try {
    const users = await prisma.users.findMany()
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
