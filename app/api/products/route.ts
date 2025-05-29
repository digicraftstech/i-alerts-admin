import { IProduct } from '@/app/interfaces';
import { API_BASE_URL, IALERTS_TOKEN } from '@/constants';
import handleError from '@/lib/handlers/error';
import { ValidationError } from '@/lib/http-errors';
import { ProductSchema } from '@/lib/validations';
import { APIErrorResponse } from '@/types/global';
import { NextResponse } from 'next/server';

export async function GET() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-token', IALERTS_TOKEN);

  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'GET',
      headers: headers,
    });
    const data = await res.json();
    const products = data.data;

    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse;
  }
}

// POST Create User
export async function POST(request: Request) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-token', IALERTS_TOKEN);

  try {
    const body = await request.json();
    const validatedData = ProductSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }
    const { image, product_name, product_plu, weight_unit } =
      validatedData.data;

    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ product_name, product_plu, image, weight_unit }),
    });

    return NextResponse.json({ success: true, data: {} }, { status: 201 });
  } catch (error) {
    handleError(error, 'api') as APIErrorResponse;
  }
}
