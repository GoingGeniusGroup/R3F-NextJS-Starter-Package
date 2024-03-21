import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Function to fetch an avatar by ID
export async function GET(request, { params }) {
  try {
    const id = params.id

    // Fetch the avatar by ID
    const avatar = await prisma.avatar.findUnique({
      where: { avatar_id: id },
    })

    if (!avatar) {
      return NextResponse.error('Avatar not found', 404)
    }

    return NextResponse.json(avatar)
  } catch (error) {
    console.error('Error fetching avatar', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

// Function to update an avatar
export async function PUT(request, { params }) {
  try {
    const { avatar_url, gg_id } = await request.json()
    const id = params.id

    // Update the avatar
    const updatedAvatar = await prisma.avatar.update({
      where: { avatar_id: id },
      data: { avatar_url, gg_id },
    })

    return NextResponse.json(updatedAvatar)
  } catch (error) {
    console.error('Error updating avatar', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

// Function to delete an avatar
export async function DELETE(request, { params }) {
  try {
    const id = params.id

    // Delete the avatar
    const deletedAvatar = await prisma.avatar.delete({
      where: { avatar_id: id },
    })

    return NextResponse.json(deletedAvatar)
  } catch (error) {
    console.error('Error deleting avatar', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
