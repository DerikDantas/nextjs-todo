import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import User from '../../../../models/User';
import connect from '../../../../utils/db';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    await connect();

    const user = await User.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid || !user) {
      return NextResponse.json(
        { message: 'Usuário ou senha incorretos' },
        {
          status: 400
        }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
    // eslint-disable-next-line
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500
    });
  }
}
