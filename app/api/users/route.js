import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const data = await request.json()
    const { email, password } = data

    // Check if email or password is null
    if (!email || !password) {
      return NextResponse.json(
        {
          message: 'Email and password are required fields.',
        },
        {
          status: 400,
        },
      )
    }

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

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
      },
    })
    return NextResponse.json(newUser)
  } catch (error) {
    console.error('Error Creating User', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

//Function to read user data
export async function GET() {
  try {
    // Fetch users' data including DOB and address
    const usersWithDetails = await prisma.users.findMany({
      select: {
        dob: true,
        address: true,
      },
    })

    // Extract DOB and address fields into separate arrays
    const dobArray = usersWithDetails.map((user) => user.dob)
    const addressArray = usersWithDetails.map((user) => user.address)

    // Fetch total user count, user data, etc.
    const userCount = await prisma.users.count()
    const users = await prisma.users.findMany()
    return NextResponse.json({ count: userCount, users: users, dob: dobArray, address: addressArray })
  } catch (error) {
    console.error('Error fetching users', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
