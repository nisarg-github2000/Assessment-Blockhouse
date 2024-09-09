import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('http://localhost:8000/api/pie-chart-data/');
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    return NextResponse.json({ error: 'Failed to fetch pie chart data' }, { status: 500 });
  }
}