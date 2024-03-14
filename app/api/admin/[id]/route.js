import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Function to read a user by ID
export async function GET(request, { params }) {
  try {
    const id = params.id

    // Fetch the admin by ID
    const user = await prisma.admin.findUnique({
      where: { admin_id: id },
    })

    if (!user) {
      return NextResponse.error('User not found', 404)
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
export async function PUT(request, { params }) {
  try {
    const data = await request.json()
    console.log(data)
    const { admin_username, admin_email } = data
    const id = params.id

    // Check if the admin exists
    const existingUser = await prisma.admin.findUnique({
      where: { admin_id: id },
    })

    if (!existingUser) {
      return NextResponse.error('User not found', 404)
    }

    // If the admin exists, update their information
    const updatedUser = await prisma.admin.update({
      where: { admin_id: id },
      data: { admin_username, admin_email },
    })
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error Updating admin', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

//Function to delete admin
export async function DELETE(request, { params }) {
  try {
    const id = params.id
    const deletedUser = await prisma.admin.delete({
      where: { admin_id: id },
    })
    return NextResponse.json(deletedUser)
  } catch (error) {
    console.error('Error deleting admin', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
