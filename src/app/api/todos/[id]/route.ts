import { NextResponse } from 'next/server';
import Todo from '../../../../models/Todo';
import connect from '../../../../utils/db';

export async function GET(request, { params }) {
  const { id } = params;
  console.log('id: ', id);

  try {
    await connect();
    const todo = await Todo.findOne({ _id: id });
    return NextResponse.json({ todo }, { status: 200 });
  } catch (err) {
    return new NextResponse(err, {
      status: 500
    });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const { title, description, completed } = await request.json();

    await connect();
    await Todo.findByIdAndUpdate(id, { title, description, completed });
    return NextResponse.json({ message: 'Todo updated' }, { status: 200 });
  } catch (err) {
    return new NextResponse(err, {
      status: 500
    });
  }
}
