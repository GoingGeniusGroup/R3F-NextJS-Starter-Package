import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

// Function to create user
export async function POST(request) {
  try {
    const data = await request.json()
    const { first_name, last_name, email, phone_number, password } = data

    // Check if the email already exists
    const existingEmail = await prisma.users.findUnique({
      where: { email },
    })

    if (existingEmail) {
      return NextResponse.json(
        {
          users: null,
          message: 'User with this email already exists!!!',
        },
        {
          status: 409,
        },
      )
    }

    // Check if the phone number already exists
    const existingPhoneNumber = await prisma.users.findUnique({
      where: { phone_number },
    })

    if (existingPhoneNumber) {
      return NextResponse.json(
        {
          users: null,
          message: 'User with this phone number already exists!!!',
        },
        {
          status: 409,
        },
      )
    }

    // If email and phone number don't exist, create a new user
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.users.create({
      data: {
        first_name,
        last_name,
        email,
        phone_number,
        password: hashedPassword,
      },
    })
    return NextResponse.json(newUser)
  } catch (error) {
    console.error('Error Creating User', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

//Function to update user
export async function GET() {
  try {
    const users = await prisma.users.findMany()
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
