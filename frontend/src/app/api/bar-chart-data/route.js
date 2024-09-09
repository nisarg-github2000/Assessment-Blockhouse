import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('http://localhost:8000/api/bar-chart-data/');
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    return NextResponse.json({ error: 'Failed to fetch bar chart data' }, { status: 500 });
  }
}