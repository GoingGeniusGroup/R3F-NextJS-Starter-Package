import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id)

    // Fetch the skill by ID
    const skill = await prisma.skills.findUnique({
      where: { skill_id: id },
    })

    if (!skill) {
      return NextResponse.error('Skill not found', 404)
    }

    return NextResponse.json(skill)
  } catch (error) {
    console.error('Error fetching skill', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

export async function PUT(request, { params }) {
  try {
    const { skill, percentage, gg_id } = await request.json()
    const id = parseInt(params.id)

    // Update the skill
    const updatedSkill = await prisma.skills.update({
      where: { skill_id: id },
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
      where: { skill_id: id },
    })

    return NextResponse.json(deletedSkill)
  } catch (error) {
    console.error('Error deleting skill', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
