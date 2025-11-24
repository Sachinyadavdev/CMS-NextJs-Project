import { put } from '@vercel/blob';
import type { Layout, LayoutVersion, User, PageSection, PageMetadata } from './db';

const BLOB_URLS = {
  layouts: 'https://7exy4hnlmwjqhh3r.public.blob.vercel-storage.com/layouts.json',
  layoutVersions: 'https://7exy4hnlmwjqhh3r.public.blob.vercel-storage.com/layout-versions.json',
  users: 'https://7exy4hnlmwjqhh3r.public.blob.vercel-storage.com/users.json',
  layoutsBackup: 'https://7exy4hnlmwjqhh3r.public.blob.vercel-storage.com/layouts-backup.json',
};

const fetchBlobData = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    return null;
  }
};

const saveBlobData = async (filename: string, data: any): Promise<void> => {
  try {
    console.log(`Attempting to save ${filename}`);
    await put(filename, JSON.stringify(data, null, 2), {
      access: 'public',
      contentType: 'application/json',
      allowOverwrite: true,
    });
    console.log(`Successfully saved ${filename}`);
  } catch (error) {
    console.error(`Error saving ${filename}:`, error);
    throw error;
  }
};

export const getLayoutVersions = async (): Promise<LayoutVersion[]> => {
  const data = await fetchBlobData(BLOB_URLS.layoutVersions);
  return data || [];
};

export const saveLayoutVersions = async (versions: LayoutVersion[]): Promise<void> => {
  await saveBlobData('layout-versions.json', versions);
};

export const getLayoutVersionsByLayoutId = async (layoutId: string): Promise<LayoutVersion[]> => {
  const versions = await getLayoutVersions();
  return versions.filter(v => v.layoutId === layoutId);
};

export const getLayouts = async (): Promise<Layout[]> => {
  const data = await fetchBlobData(BLOB_URLS.layouts);
  if (!data) return [];
  
  const layouts: Layout[] = data;
  const allVersions = await getLayoutVersions();

  return layouts.map(layout => ({
    ...layout,
    versions: allVersions.filter(v => v.layoutId === layout.id)
  }));
};

export const getLayoutBySlug = async (slug: string): Promise<Layout | null> => {
  const layouts = await getLayouts();
  return layouts.find(l => l.slug === slug) || null;
};

export const getLayoutById = async (id: string): Promise<Layout | null> => {
  const layouts = await getLayouts();
  return layouts.find(l => l.id === id) || null;
};

export const createLayout = async (layout: Omit<Layout, 'id' | 'createdAt' | 'updatedAt' | 'currentVersionId' | 'versions'>): Promise<Layout> => {
  const layouts = await getLayouts();
  const versionId = Date.now().toString();
  const newLayout: Layout = {
    ...layout,
    id: Date.now().toString(),
    sections: layout.sections || [],
    metadata: layout.metadata || { title: '', description: '' },
    versions: [],
    currentVersionId: versionId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const initialVersion: LayoutVersion = {
    versionId,
    layoutId: newLayout.id,
    sections: layout.sections || [],
    createdAt: new Date().toISOString(),
    createdBy: 'system',
    isDraft: false,
  };

  const versions = await getLayoutVersions();
  versions.push(initialVersion);
  await saveLayoutVersions(versions);

  layouts.push(newLayout);
  await saveBlobData('layouts.json', layouts);
  
  return newLayout;
};

export const updateLayout = async (id: string, updates: Partial<Omit<Layout, 'id' | 'createdAt'>>): Promise<Layout | null> => {
  const layouts = await getLayouts();
  const index = layouts.findIndex(l => l.id === id);
  if (index === -1) return null;
  
  layouts[index] = {
    ...layouts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  await saveBlobData('layouts.json', layouts);
  return layouts[index];
};

export const deleteLayout = async (id: string): Promise<boolean> => {
  const layouts = await getLayouts();
  const filteredLayouts = layouts.filter(l => l.id !== id);
  if (filteredLayouts.length === layouts.length) return false;
  
  await saveBlobData('layouts.json', filteredLayouts);
  return true;
};

export const saveLayoutVersion = async (
  id: string,
  sections: PageSection[],
  userEmail: string,
  isDraft: boolean = false,
  notes?: string
): Promise<Layout | null> => {
  try {
    const layouts = await getLayouts();
    const index = layouts.findIndex(l => l.id === id);
    if (index === -1) return null;

    const versionId = Date.now().toString();
    const newVersion: LayoutVersion = {
      versionId,
      layoutId: id,
      sections,
      createdAt: new Date().toISOString(),
      createdBy: userEmail,
      isDraft,
      notes,
    };

    const versions = await getLayoutVersions();
    versions.push(newVersion);
    await saveLayoutVersions(versions);

    layouts[index].currentVersionId = versionId;
    layouts[index].sections = sections;
    layouts[index].updatedAt = new Date().toISOString();

    await saveBlobData('layouts.json', layouts);
    return layouts[index];
  } catch (error) {
    console.error('Error in saveLayoutVersion:', error);
    throw error;
  }
};

export const revertToVersion = async (layoutId: string, versionId: string, userId: string): Promise<Layout | null> => {
  const layouts = await getLayouts();
  const layoutIndex = layouts.findIndex(l => l.id === layoutId);
  if (layoutIndex === -1) return null;

  const version = layouts[layoutIndex].versions.find(v => v.versionId === versionId);
  if (!version) return null;

  return saveLayoutVersion(layoutId, version.sections, userId, false, `Reverted to version ${versionId}`);
};

export const updateLayoutMetadata = async (
  id: string,
  metadata: PageMetadata
): Promise<Layout | null> => {
  const layouts = await getLayouts();
  const index = layouts.findIndex(l => l.id === id);
  if (index === -1) return null;

  layouts[index].metadata = metadata;
  layouts[index].updatedAt = new Date().toISOString();
  await saveBlobData('layouts.json', layouts);
  return layouts[index];
};

export const getUsers = async (): Promise<User[]> => {
  const data = await fetchBlobData(BLOB_URLS.users);
  return data || [];
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const users = await getUsers();
  return users.find(u => u.email === email) || null;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const users = await getUsers();
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
  };
  users.push(newUser);
  await saveBlobData('users.json', users);
  return newUser;
};
