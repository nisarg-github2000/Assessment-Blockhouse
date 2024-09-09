import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('http://localhost:8000/api/line-chart-data/');
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching line chart data:', error);
    return NextResponse.json({ error: 'Failed to fetch line chart data' }, { status: 500 });
  }
}