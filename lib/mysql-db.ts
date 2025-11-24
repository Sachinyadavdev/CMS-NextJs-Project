import mysql from 'mysql2/promise';
import type { Layout, LayoutVersion, User, PageSection, PageMetadata } from './db';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const initTables = async () => {
  const connection = await pool.getConnection();
  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS layouts (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        sections LONGTEXT NOT NULL,
        metadata JSON NOT NULL,
        imageUrl JSON,
        submenu JSON,
        currentVersionId VARCHAR(255),
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS layout_versions (
        versionId VARCHAR(255) PRIMARY KEY,
        layoutId VARCHAR(255) NOT NULL,
        sections LONGTEXT NOT NULL,
        createdAt DATETIME NOT NULL,
        createdBy VARCHAR(255) NOT NULL,
        isDraft BOOLEAN DEFAULT FALSE,
        notes TEXT,
        FOREIGN KEY (layoutId) REFERENCES layouts(id) ON DELETE CASCADE,
        INDEX idx_layoutId (layoutId)
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        isAdmin BOOLEAN DEFAULT FALSE,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing tables:', error);
  } finally {
    connection.release();
  }
};

initTables().catch(console.error);

export const getLayoutVersions = async (): Promise<LayoutVersion[]> => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT versionId, layoutId, sections, createdAt, createdBy, isDraft, notes FROM layout_versions ORDER BY createdAt DESC'
    );
    connection.release();
    
    return (rows as any[]).map(row => ({
      versionId: row.versionId,
      layoutId: row.layoutId,
      sections: JSON.parse(row.sections),
      createdAt: row.createdAt.toISOString(),
      createdBy: row.createdBy,
      isDraft: row.isDraft,
      notes: row.notes,
    }));
  } catch (error) {
    console.error('Error fetching layout versions:', error);
    return [];
  }
};

export const saveLayoutVersions = async (versions: LayoutVersion[]): Promise<void> => {
  const connection = await pool.getConnection();
  try {
    for (const version of versions) {
      await connection.execute(
        'INSERT INTO layout_versions (versionId, layoutId, sections, createdAt, createdBy, isDraft, notes) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE sections = VALUES(sections)',
        [
          version.versionId,
          version.layoutId,
          JSON.stringify(version.sections),
          new Date(version.createdAt),
          version.createdBy,
          version.isDraft,
          version.notes || null,
        ]
      );
    }
    console.log('Layout versions saved successfully');
  } catch (error) {
    console.error('Error saving layout versions:', error);
    throw error;
  } finally {
    connection.release();
  }
};

export const getLayoutVersionsByLayoutId = async (layoutId: string): Promise<LayoutVersion[]> => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT versionId, layoutId, sections, createdAt, createdBy, isDraft, notes FROM layout_versions WHERE layoutId = ? ORDER BY createdAt DESC',
      [layoutId]
    );
    connection.release();
    
    return (rows as any[]).map(row => ({
      versionId: row.versionId,
      layoutId: row.layoutId,
      sections: JSON.parse(row.sections),
      createdAt: row.createdAt.toISOString(),
      createdBy: row.createdBy,
      isDraft: row.isDraft,
      notes: row.notes,
    }));
  } catch (error) {
    console.error('Error fetching layout versions by ID:', error);
    return [];
  }
};

export const getNavigationData = async () => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT id, name, slug, imageUrl, submenu, metadata FROM layouts'
    );
    connection.release();

    return (rows as any[]).map(row => {
      let imageUrl = [];
      try {
        imageUrl = row.imageUrl ? JSON.parse(row.imageUrl) : [];
        if (!Array.isArray(imageUrl)) imageUrl = [];
      } catch (e) {
        imageUrl = [];
      }

      let submenu = [];
      try {
        submenu = row.submenu ? JSON.parse(row.submenu) : [];
        if (!Array.isArray(submenu)) submenu = [];
      } catch (e) {
        submenu = [];
      }

      let tagLine = '';
      try {
        const metadata = JSON.parse(row.metadata);
        tagLine = metadata.tagLine || '';
      } catch (e) {
        tagLine = '';
      }

      return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        imageUrl,
        submenu,
        tagLine,
      };
    });
  } catch (error) {
    console.error('Error fetching navigation data:', error);
    return [];
  }
};

export const getLayouts = async (): Promise<Layout[]> => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM layouts');
    connection.release();
    
    const allVersions = await getLayoutVersions();
    
    return (rows as any[]).map(row => {
      let imageUrl = [];
      try {
        imageUrl = row.imageUrl ? JSON.parse(row.imageUrl) : [];
        if (!Array.isArray(imageUrl)) imageUrl = [];
      } catch (e) {
        console.error('Error parsing imageUrl:', e);
        imageUrl = [];
      }

      let submenu = [];
      try {
        submenu = row.submenu ? JSON.parse(row.submenu) : [];
        if (!Array.isArray(submenu)) submenu = [];
      } catch (e) {
        console.error('Error parsing submenu:', e);
        submenu = [];
      }

      let sections = [];
      try {
        sections = JSON.parse(row.sections);
        if (!Array.isArray(sections)) sections = [];
      } catch (e) {
        console.error('Error parsing sections:', e);
        sections = [];
      }

      let metadata = { title: '', description: '' };
      try {
        metadata = JSON.parse(row.metadata);
        if (typeof metadata !== 'object' || metadata === null) metadata = { title: '', description: '' };
      } catch (e) {
        console.error('Error parsing metadata:', e);
        metadata = { title: '', description: '' };
      }

      return {
        id: row.id,
        name: row.name,
        title: row.title,
        slug: row.slug,
        sections,
        metadata,
        imageUrl,
        submenu,
        currentVersionId: row.currentVersionId,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
        versions: allVersions.filter(v => v.layoutId === row.id),
      };
    }) as any;
  } catch (error) {
    console.error('Error fetching layouts:', error);
    return [];
  }
};

export const getLayoutBySlug = async (slug: string): Promise<Layout | null> => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM layouts WHERE slug = ?',
      [slug]
    );
    connection.release();
    
    if ((rows as any[]).length === 0) return null;
    
    const row = (rows as any[])[0];
    const allVersions = await getLayoutVersions();

    let imageUrl = [];
    try {
      imageUrl = row.imageUrl ? JSON.parse(row.imageUrl) : [];
      if (!Array.isArray(imageUrl)) imageUrl = [];
    } catch (e) {
      console.error('Error parsing imageUrl:', e);
      imageUrl = [];
    }

    let submenu = [];
    try {
      submenu = row.submenu ? JSON.parse(row.submenu) : [];
      if (!Array.isArray(submenu)) submenu = [];
    } catch (e) {
      console.error('Error parsing submenu:', e);
      submenu = [];
    }

    let sections = [];
    try {
      sections = JSON.parse(row.sections);
      if (!Array.isArray(sections)) sections = [];
    } catch (e) {
      console.error('Error parsing sections:', e);
      sections = [];
    }

    let metadata = { title: '', description: '' };
    try {
      metadata = JSON.parse(row.metadata);
      if (typeof metadata !== 'object' || metadata === null) metadata = { title: '', description: '' };
    } catch (e) {
      console.error('Error parsing metadata:', e);
      metadata = { title: '', description: '' };
    }

    return {
      id: row.id,
      name: row.name,
      title: row.title,
      slug: row.slug,
      sections,
      metadata,
      imageUrl,
      submenu,
      currentVersionId: row.currentVersionId,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      versions: allVersions.filter(v => v.layoutId === row.id),
    } as any;
  } catch (error) {
    console.error('Error fetching layout by slug:', error);
    return null;
  }
};

export const getLayoutById = async (id: string): Promise<Layout | null> => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM layouts WHERE id = ?',
      [id]
    );
    connection.release();

    if ((rows as any[]).length === 0) return null;

    const row = (rows as any[])[0];
    const allVersions = await getLayoutVersions();

    let imageUrl = [];
    try {
      imageUrl = row.imageUrl ? JSON.parse(row.imageUrl) : [];
      if (!Array.isArray(imageUrl)) imageUrl = [];
    } catch (e) {
      console.error('Error parsing imageUrl:', e);
      imageUrl = [];
    }

    let submenu = [];
    try {
      submenu = row.submenu ? JSON.parse(row.submenu) : [];
      if (!Array.isArray(submenu)) submenu = [];
    } catch (e) {
      console.error('Error parsing submenu:', e);
      submenu = [];
    }

    let sections = [];
    try {
      sections = JSON.parse(row.sections);
      if (!Array.isArray(sections)) sections = [];
    } catch (e) {
      console.error('Error parsing sections:', e);
      sections = [];
    }

    let metadata = { title: '', description: '' };
    try {
      metadata = JSON.parse(row.metadata);
      if (typeof metadata !== 'object' || metadata === null) metadata = { title: '', description: '' };
    } catch (e) {
      console.error('Error parsing metadata:', e);
      metadata = { title: '', description: '' };
    }

    return {
      id: row.id,
      name: row.name,
      title: row.title,
      slug: row.slug,
      sections,
      metadata,
      imageUrl,
      submenu,
      currentVersionId: row.currentVersionId,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      versions: allVersions.filter(v => v.layoutId === row.id),
    } as any;
  } catch (error) {
    console.error('Error fetching layout by ID:', error);
    return null;
  }
};

export const createLayout = async (layout: Omit<Layout, 'id' | 'createdAt' | 'updatedAt' | 'currentVersionId' | 'versions'>): Promise<Layout> => {
  const connection = await pool.getConnection();
  try {
    const id = Date.now().toString();
    const versionId = Date.now().toString();
    const now = new Date();

    await connection.execute(
      'INSERT INTO layouts (id, name, title, slug, sections, metadata, imageUrl, submenu, currentVersionId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        layout.name,
        layout.title,
        layout.slug,
        JSON.stringify(layout.sections || []),
        JSON.stringify(layout.metadata || { title: '', description: '' }),
        JSON.stringify((layout as any).imageUrl || null),
        JSON.stringify((layout as any).submenu || null),
        versionId,
        now,
        now,
      ]
    );

    const initialVersion: LayoutVersion = {
      versionId,
      layoutId: id,
      sections: layout.sections || [],
      createdAt: now.toISOString(),
      createdBy: 'system',
      isDraft: false,
    };

    await connection.execute(
      'INSERT INTO layout_versions (versionId, layoutId, sections, createdAt, createdBy, isDraft) VALUES (?, ?, ?, ?, ?, ?)',
      [
        versionId,
        id,
        JSON.stringify(initialVersion.sections),
        now,
        'system',
        false,
      ]
    );

    connection.release();

    return {
      id,
      name: layout.name,
      title: layout.title,
      slug: layout.slug,
      sections: layout.sections || [],
      metadata: layout.metadata || { title: '', description: '' },
      imageUrl: (layout as any).imageUrl || [],
      submenu: (layout as any).submenu || [],
      currentVersionId: versionId,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      versions: [initialVersion],
    } as any;
  } catch (error) {
    connection.release();
    console.error('Error creating layout:', error);
    throw error;
  }
};

export const updateLayout = async (id: string, updates: Partial<Omit<Layout, 'id' | 'createdAt'>>): Promise<Layout | null> => {
  const connection = await pool.getConnection();
  try {
    const layout = await getLayoutById(id);
    if (!layout) return null;

    const updatedLayout = {
      ...layout,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await connection.execute(
      'UPDATE layouts SET name = ?, title = ?, slug = ?, sections = ?, metadata = ?, imageUrl = ?, submenu = ?, currentVersionId = ?, updatedAt = ? WHERE id = ?',
      [
        updatedLayout.name,
        updatedLayout.title,
        updatedLayout.slug,
        JSON.stringify(updatedLayout.sections),
        JSON.stringify(updatedLayout.metadata),
        JSON.stringify((updatedLayout as any).imageUrl || []),
        JSON.stringify((updatedLayout as any).submenu || []),
        updatedLayout.currentVersionId,
        new Date(),
        id,
      ]
    );

    connection.release();
    return updatedLayout;
  } catch (error) {
    connection.release();
    console.error('Error updating layout:', error);
    return null;
  }
};

export const deleteLayout = async (id: string): Promise<boolean> => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      'DELETE FROM layouts WHERE id = ?',
      [id]
    );
    connection.release();
    return (result as any).affectedRows > 0;
  } catch (error) {
    connection.release();
    console.error('Error deleting layout:', error);
    return false;
  }
};

export const saveLayoutVersion = async (
  id: string,
  sections: PageSection[],
  userEmail: string,
  isDraft: boolean = false,
  notes?: string
): Promise<Layout | null> => {
  const connection = await pool.getConnection();
  try {
    const layouts = await getLayouts();
    const layout = layouts.find(l => l.id === id);
    if (!layout) return null;

    const versionId = Date.now().toString();
    const now = new Date();

    await connection.execute(
      'INSERT INTO layout_versions (versionId, layoutId, sections, createdAt, createdBy, isDraft, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        versionId,
        id,
        JSON.stringify(sections),
        now,
        userEmail,
        isDraft,
        notes || null,
      ]
    );

    await connection.execute(
      'UPDATE layouts SET currentVersionId = ?, sections = ?, updatedAt = ? WHERE id = ?',
      [versionId, JSON.stringify(sections), now, id]
    );

    connection.release();

    return {
      ...layout,
      currentVersionId: versionId,
      sections,
      updatedAt: now.toISOString(),
      versions: [
        ...layout.versions,
        {
          versionId,
          layoutId: id,
          sections,
          createdAt: now.toISOString(),
          createdBy: userEmail,
          isDraft,
          notes,
        },
      ],
    };
  } catch (error) {
    connection.release();
    console.error('Error saving layout version:', error);
    throw error;
  }
};

export const revertToVersion = async (layoutId: string, versionId: string, userId: string): Promise<Layout | null> => {
  const layouts = await getLayouts();
  const layout = layouts.find(l => l.id === layoutId);
  if (!layout) return null;

  const version = layout.versions.find(v => v.versionId === versionId);
  if (!version) return null;

  return saveLayoutVersion(layoutId, version.sections, userId, false, `Reverted to version ${versionId}`);
};

export const updateLayoutMetadata = async (
  id: string,
  metadata: PageMetadata,
): Promise<Layout | null> => {
  const connection = await pool.getConnection();
  try {
    const layout = await getLayoutById(id);
    if (!layout) return null;

    await connection.execute(
      'UPDATE layouts SET metadata = ?, updatedAt = ? WHERE id = ?',
      [JSON.stringify(metadata), new Date(), id]
    );

    connection.release();

    return {
      ...layout,
      metadata,
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    connection.release();
    console.error('Error updating layout metadata:', error);
    return null;
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM users');
    connection.release();
    
    return (rows as any[]).map(row => ({
      id: row.id,
      email: row.email,
      password: row.password,
      name: row.name,
      isAdmin: row.isAdmin,
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    connection.release();
    
    if ((rows as any[]).length === 0) return null;
    
    const row = (rows as any[])[0];
    return {
      id: row.id,
      email: row.email,
      password: row.password,
      name: row.name,
      isAdmin: row.isAdmin,
    };
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const connection = await pool.getConnection();
  try {
    const id = Date.now().toString();
    
    await connection.execute(
      'INSERT INTO users (id, email, password, name, isAdmin) VALUES (?, ?, ?, ?, ?)',
      [id, user.email, user.password, user.name, user.isAdmin]
    );

    connection.release();

    return {
      id,
      email: user.email,
      password: user.password,
      name: user.name,
      isAdmin: user.isAdmin,
    };
  } catch (error) {
    connection.release();
    console.error('Error creating user:', error);
    throw error;
  }
};
