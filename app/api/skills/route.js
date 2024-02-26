import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Function to create a skill
export async function POST(request) {
  try {
    const { skill, percentage, gg_id } = await request.json()

    // Check if the user exists
    const existingUser = await prisma.users.findUnique({
      where: { gg_id },
    })

    if (!existingUser) {
      return NextResponse.error('User not found', 404)
    }

    // Create the skill for the user
    const newSkill = await prisma.skills.create({
      data: {
        skill,
        percentage,
        gg_id,
      },
    })

    return NextResponse.json(newSkill)
  } catch (error) {
    console.error('Error Creating Skill', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

// Function to read all skills
export async function GET() {
  try {
    const skills = await prisma.skills.findMany()
    return NextResponse.json(skills)
  } catch (error) {
    console.error('Error fetching skills', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Function to create a skill
// export async function POST(request) {
//   try {
//     const { skill, percentage } = await request.json()

//     // Create the skill
//     const newSkill = await prisma.skills.create({
//       data: {
//         skill,
//         percentage,
//       },
//     })

//     return NextResponse.json(newSkill)
//   } catch (error) {
//     console.error('Error Creating Skill', error)
//     return NextResponse.error('Internal Server Error', 500)
//   }
// }

// // Function to read all skills
// export async function GET() {
//   try {
//     const skills = await prisma.skills.findMany()
//     return NextResponse.json(skills)
//   } catch (error) {
//     console.error('Error fetching skills', error)
//     return NextResponse.error('Internal Server Error', 500)
//   }
// }
