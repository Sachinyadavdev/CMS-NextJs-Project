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

    try {
      await connection.execute('ALTER TABLE layouts ADD COLUMN imageUrl JSON');
    } catch (e: any) {
      if (e.code !== 'ER_DUP_FIELDNAME') throw e;
    }

    try {
      await connection.execute('ALTER TABLE layouts ADD COLUMN submenu JSON');
    } catch (e: any) {
      if (e.code !== 'ER_DUP_FIELDNAME') throw e;
    }

    connection.release();
    pool.end();

    return NextResponse.json(
      {
        success: true,
        message: 'Schema updated successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Schema update failed',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
