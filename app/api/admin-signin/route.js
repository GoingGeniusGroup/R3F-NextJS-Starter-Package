import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = 'ggadminHa8vZ@|P4JWt,Mt/NOWN&4/pIa(J7&&Agg'

export async function POST(request) {
  try {
    const { admin_username, admin_password } = await request.json()

    // Find the admin by admin_username
    const admin = await prisma.admin.findUnique({
      where: { admin_username },
    })

    // Check if admin exists
    if (!admin) {
      // If admin doesn't exist, return error indicating incorrect username
      return NextResponse.error('Incorrect username', 401)
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(admin_password, admin.admin_password)
    if (!passwordMatch) {
      // If password doesn't match, return error indicating incorrect password
      return NextResponse.error('Incorrect password', 401)
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin.admin_id }, JWT_SECRET, { expiresIn: '1h' })

    // Return token upon sign in
    return NextResponse.json({ token })
  } catch (error) {
    console.error('Error signing in admin:', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
