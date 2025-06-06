import { BaseURL, iAlertsToken } from '@/constants';
import handleError from '@/lib/handlers/error';
import { APIErrorResponse } from '@/types/global';
import { NextResponse } from 'next/server';

export async function GET() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-token', iAlertsToken!);

  try {
    const res = await fetch(`${BaseURL}/scales`, {
      method: 'GET',
      headers: headers,
    });
    const data = await res.json();
    const scales = data.data;

    return NextResponse.json({ success: true, data: scales }, { status: 200 });
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse;
  }
}
