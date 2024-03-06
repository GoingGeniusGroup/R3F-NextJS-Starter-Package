import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Function to read a user by ID
export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id)

    // Fetch the user by ID
    const user = await prisma.users.findUnique({
      where: { gg_id: id },
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

//Function to update user
// export async function PUT(request, { params }) {
//   try {
//     const data = await request.json()
//     console.log(data)
//     const { first_name, last_name, email, phone_number } = data
//     const id = parseInt(params.id)

//     // Check if the user exists
//     const existingUser = await prisma.users.findUnique({
//       where: { gg_id: id },
//     })

//     if (!existingUser) {
//       return NextResponse.error('User not found', 404)
//     }

//     // If the user exists, update their information
//     const updatedUser = await prisma.users.update({
//       where: { gg_id: id },
//       data: { first_name, last_name, email, phone_number },
//     })
//     return NextResponse.json(updatedUser)
//   } catch (error) {
//     console.error('Error Updating user', error)
//     return NextResponse.error('Internal Server Error', 500)
//   }
// }

export async function PUT(request, { params }) {
  try {
    const data = await request.json()
    console.log(data)
    const { first_name, last_name, email, phone_number, image_url, description, address } = data
    const id = parseInt(params.id)

    // Check if the user exists
    const existingUser = await prisma.users.findUnique({
      where: { gg_id: id },
    })

    if (!existingUser) {
      return NextResponse.error('User not found', 404)
    }

    // If the user exists, update their information
    const updatedUser = await prisma.users.update({
      where: { gg_id: id },
      data: { first_name, last_name, email, phone_number, image_url, description, address },
    })
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error Updating user', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

//Function to delete user
export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id)
    const deletedUser = await prisma.users.delete({
      where: { gg_id: id },
    })
    return NextResponse.json(deletedUser)
  } catch (error) {
    console.error('Error deleting user', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
