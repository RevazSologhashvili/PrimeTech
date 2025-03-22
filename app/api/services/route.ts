// app/api/services/route.ts

import { createService } from '@/app/api/actions'; // Assuming the path to serviceActions
import { NextResponse } from 'next/server';

// POST method to handle service creation
export async function POST(req: Request) {
  try {
    // Parse the incoming JSON request body
    const body = await req.json();

    const {
      title,
      description,
      serviceBaseType,
      servicePriceOnsite,
      servicePriceRemote,
      isRemote,
      imageHref,
    } = body;

    // Call the createService function to create the new service in the database
    const newService = await createService({
      title,
      description,
      serviceBaseType,
      servicePriceOnsite,
      servicePriceRemote,
      isRemote,
      imageHref,
    });

    // Return the created service in the response
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
