import { IALERTS_TOKEN, API_BASE_URL } from '@/constants';
import handleError from '@/lib/handlers/error';
import { NotFoundError } from '@/lib/http-errors';
import { APIErrorResponse } from '@/types/global';

import { NextResponse } from 'next/server';

// GET user by id
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) throw new NotFoundError('Scale');

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-token', IALERTS_TOKEN);

  try {
    const res = await fetch(`${API_BASE_URL}/scales/${id}`, {
      method: 'GET',
      headers: headers,
    });
    const scale = await res.json();

    if (!scale.scale) throw new NotFoundError('Scale');
    return NextResponse.json({ scale });
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse;
    // return null;
  }
}
