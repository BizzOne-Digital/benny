import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function requireAdminApi() {
  const session = await auth()
  if (!session?.user?.email) {
    return {
      session: null as null,
      error: NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 }),
    }
  }
  return { session, error: null as null }
}
