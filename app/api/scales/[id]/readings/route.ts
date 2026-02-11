import { BaseURL, iAlertsToken } from '@/constants';
import handleError from '@/lib/handlers/error';
import { NotFoundError } from '@/lib/http-errors';
import { APIErrorResponse } from '@/types/global';
import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) throw new NotFoundError('Scale');

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-token', iAlertsToken!);

  try {
    // console.log('Fetching Readings...');
    const res = await fetch(`${BaseURL}/scales/${id}/readings`, {
      method: 'GET',
      headers: headers,
    });
    const readings = await res.json();

    return NextResponse.json({ data: readings.data }, { status: 200 });
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse;
  }
}
