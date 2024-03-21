import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Function to create an avatar
export async function POST(request) {
  try {
    const { avatar_url, gg_id } = await request.json()

    // Check if the user exists
    const existingUser = await prisma.users.findUnique({
      where: { gg_id },
    })

    if (!existingUser) {
      return NextResponse.error('User not found', 404)
    }

    // Create the avatar for the user
    const newAvatar = await prisma.avatar.create({
      data: {
        avatar_url,
        gg_id,
      },
    })

    return NextResponse.json(newAvatar)
  } catch (error) {
    console.error('Error Creating Avatar', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

// Function to read all avatars
export async function GET() {
  try {
    const avatars = await prisma.avatar.findMany()
    return NextResponse.json(avatars)
  } catch (error) {
    console.error('Error fetching avatars', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
