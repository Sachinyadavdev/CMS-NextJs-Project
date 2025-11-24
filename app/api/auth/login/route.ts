import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, createUser } from '@/lib/mysql-db';
import { comparePassword, generateToken, hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, register } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    let user = await getUserByEmail(email);

    if (register) {
      if (user) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        );
      }

      const hashedPassword = await hashPassword(password);
      user = await createUser({
        email,
        password: hashedPassword,
        name: body.name || email.split('@')[0],
        isAdmin: false,
      });
    } else {
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }
    }

    const token = generateToken(user.id, user.email, user.isAdmin);

    const response = NextResponse.json(
      {
        message: register ? 'User registered successfully' : 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        },
        token,
      },
      { status: 200 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
