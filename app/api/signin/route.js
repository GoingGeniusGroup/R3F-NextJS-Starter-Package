import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = 'ggHa8vZ@|P4JWt,Mt/NOWN&4/pIa(J7&&Agg'

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

    // Generate JWT token
    const token = jwt.sign({ id: user.gg_id }, JWT_SECRET, { expiresIn: '1h' })

    // Return token upon sign in
    return NextResponse.json({ token })
  } catch (error) {
    console.error('Error signing in:', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
