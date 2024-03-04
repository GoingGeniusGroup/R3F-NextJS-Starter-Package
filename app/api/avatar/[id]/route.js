import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(request, { params }) {
  try {
    const data = await request.json()
    const { avatarUrl } = data
    const id = parseInt(params.id)

    // Check if the user exists
    const existingUser = await prisma.users.findUnique({
      where: { gg_id: id },
    })

    if (!existingUser) {
      return NextResponse.error('User not found', 404)
    }

    // If the user exists, update their avatar URL
    const updatedUser = await prisma.users.update({
      where: { gg_id: id },
      data: { avatar_url: avatarUrl },
    })
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating user avatar URL', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
