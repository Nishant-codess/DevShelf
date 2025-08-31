import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for showcases (in production, use a database)
const showcases = new Map()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Get showcase data from storage
    const showcaseData = showcases.get(id)
    
    if (!showcaseData) {
      return NextResponse.json(
        { error: 'Showcase not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(showcaseData)
  } catch (error) {
    console.error('Error fetching showcase:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    // Store showcase data
    showcases.set(id, body)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error storing showcase:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
