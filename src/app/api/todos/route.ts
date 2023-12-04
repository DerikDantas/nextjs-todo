import { NextResponse } from 'next/server';
import Todo from '../../../models/Todo';
import connect from '../../../utils/db';

export async function GET() {
  try {
    await connect();
    const todos = await Todo.find();
    return NextResponse.json({ todos });
  } catch (err) {
    return new NextResponse(err, {
      status: 500
    });
  }
}

export async function POST(request) {
  try {
    const { title, description } = await request.json();
    await connect();
    await Todo.create({ title, description });
    return NextResponse.json({ message: 'Todo Created' }, { status: 201 });
  } catch (err) {
    return new NextResponse(err, {
      status: 500
    });
  }
}
