import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const data = await request.json()
    const { admin_username, admin_email, admin_password } = data

    // Check if username, email, or password is null
    if (!admin_username || !admin_email || !admin_password) {
      return NextResponse.json(
        {
          message: 'Username, email, and password are required fields.',
        },
        {
          status: 400,
        },
      )
    }

    // Check if the email already exists
    const existingEmail = await prisma.admin.findUnique({
      where: { admin_email },
    })

    if (existingEmail) {
      return NextResponse.json(
        {
          admin: null,
          message: 'Admin with this email already exists.',
        },
        {
          status: 409,
        },
      )
    }

    // Check if the username already exists
    const existingUsername = await prisma.admin.findUnique({
      where: { admin_username },
    })

    if (existingUsername) {
      return NextResponse.json(
        {
          admin: null,
          message: 'Admin with this username already exists.',
        },
        {
          status: 409,
        },
      )
    }

    // Create a new admin
    const hashedPassword = await bcrypt.hash(admin_password, 10)
    const newAdmin = await prisma.admin.create({
      data: {
        admin_username,
        admin_email,
        admin_password: hashedPassword,
      },
    })
    return NextResponse.json(newAdmin)
  } catch (error) {
    console.error('Error Creating Admin', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

//Function to read admin data
export async function GET() {
  try {
    const users = await prisma.admin.findMany()
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
