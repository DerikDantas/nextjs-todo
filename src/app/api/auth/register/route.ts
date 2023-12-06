import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import User from '../../../../models/User';
import connect from '../../../../utils/db';

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    await connect();

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return NextResponse.json(
        { message: 'E-mail já utilizado' },
        {
          status: 400
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword
    });

    delete user.password;

    return NextResponse.json({ user }, { status: 200 });
    // eslint-disable-next-line
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500
    });
  }
}
