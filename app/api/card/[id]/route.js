import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(request, { params }) {
  try {
    const data = await request.json()
    console.log(data)
    const { first_name, last_name, phone_number, address, dob } = data
    const id = params.id

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
      data: { first_name, last_name, phone_number, address, dob },
    })
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error Updating user', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
