import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: NextRequest) {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    const connection = await pool.getConnection();

    await connection.execute('DELETE FROM layout_versions');
    await connection.execute('DELETE FROM layouts');
    await connection.execute('DELETE FROM users');

    connection.release();
    pool.end();

    return NextResponse.json(
      {
        success: true,
        message: 'Database reset successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Reset failed',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
