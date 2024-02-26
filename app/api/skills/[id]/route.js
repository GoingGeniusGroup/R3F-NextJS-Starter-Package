import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(request, { params }) {
  try {
    const { skill, percentage, gg_id } = await request.json()
    const id = parseInt(params.id)

    // Update the skill
    const updatedSkill = await prisma.skills.update({
      where: { id },
      data: { skill, percentage, gg_id },
    })

    return NextResponse.json(updatedSkill)
  } catch (error) {
    console.error('Error updating skill', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

// Function to delete a skill
export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id)

    // Delete the skill
    const deletedSkill = await prisma.skills.delete({
      where: { id },
    })

    return NextResponse.json(deletedSkill)
  } catch (error) {
    console.error('Error deleting skill', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
// // Function to update a skill
// export async function PUT(request, { params }) {
//   try {
//     const { skill, percentage } = await request.json()
//     const id = parseInt(params.id)

//     const updatedSkill = await prisma.skills.update({
//       where: { id },
//       data: { skill, percentage },
//     })

//     return NextResponse.json(updatedSkill)
//   } catch (error) {
//     console.error('Error updating skill', error)
//     return NextResponse.error('Internal Server Error', 500)
//   }
// }

// // Function to delete a skill
// export async function DELETE(request, { params }) {
//   try {
//     const id = parseInt(params.id)

//     const deletedSkill = await prisma.skills.delete({
//       where: { id },
//     })

//     return NextResponse.json(deletedSkill)
//   } catch (error) {
//     console.error('Error deleting skill', error)
//     return NextResponse.error('Internal Server Error', 500)
//   }
// }
