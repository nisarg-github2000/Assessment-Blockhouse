import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('http://localhost:8000/api/candlestick-data/');
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching candlestick data:', error);
    return NextResponse.json({ error: 'Failed to fetch candlestick data' }, { status: 500 });
  }
}