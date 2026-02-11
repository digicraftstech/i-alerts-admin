import { BaseURL, iAlertsToken } from '@/constants';
import handleError from '@/lib/handlers/error';
import { NotFoundError } from '@/lib/http-errors';
import { APIErrorResponse } from '@/types/global';
import { NextResponse } from 'next/server';

export async function PUT(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) throw new NotFoundError('Scale');

  const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  headers.append('x-token', iAlertsToken!);

  try {
    const res = await fetch(`${BaseURL}/scales/${id}/restart`, {
      method: 'PUT',
      headers: headers,
    });
    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse;
  }
}
