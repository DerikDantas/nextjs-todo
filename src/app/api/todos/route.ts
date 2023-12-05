import { NextRequest, NextResponse } from 'next/server';
import Todo from '../../../models/Todo';
import connect from '../../../utils/db';

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');

  try {
    await connect();
    const todos = await Todo.find({
      userId
    });
    return NextResponse.json({ todos });
  } catch (err) {
    return new NextResponse(err, {
      status: 500
    });
  }
}

export async function POST(request) {
  try {
    const { title, description, userId, completed } = await request.json();

    await connect();
    const todo = await Todo.create({ title, description, userId, completed });
    return NextResponse.json({ todo }, { status: 201 });
  } catch (err) {
    return new NextResponse(err, {
      status: 500
    });
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id');

  try {
    await connect();
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Todo deleted' }, { status: 200 });
  } catch (err) {
    return new NextResponse(err, {
      status: 500
    });
  }
}
