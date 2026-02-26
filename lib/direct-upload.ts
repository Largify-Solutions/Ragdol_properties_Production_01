/**
 * directUpload — uploads a File directly from the browser to Supabase Storage.
 *
 * The file bytes never pass through Vercel/Next.js serverless functions,
 * so there is no 4.5 MB FUNCTION_PAYLOAD_TOO_LARGE limit.
 *
 * Flow:
 *  1. POST /api/admin/signed-upload-url  → small JSON request to get a signed URL
 *  2. PUT signedUrl with the raw file    → browser uploads straight to Supabase
 *  3. Return the public URL
 */
export async function directUpload(
  file: File,
  bucket: string,
  filePath: string
): Promise<string> {
  // Step 1: ask our API for a signed upload URL (tiny metadata request, no file bytes)
  const urlRes = await fetch('/api/admin/signed-upload-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bucket, path: filePath, contentType: file.type }),
  })

  if (!urlRes.ok) {
    const text = await urlRes.text()
    throw new Error(`Failed to get upload URL (${urlRes.status}): ${text.substring(0, 200)}`)
  }

  const { signedUrl, publicUrl } = await urlRes.json()

  // Step 2: upload file directly to Supabase — bypasses Vercel entirely
  const uploadRes = await fetch(signedUrl, {
    method: 'PUT',
    body: file,
    headers: { 'Content-Type': file.type },
  })

  if (!uploadRes.ok) {
    const text = await uploadRes.text()
    throw new Error(`Direct upload failed (${uploadRes.status}): ${text.substring(0, 200)}`)
  }

  return publicUrl
}
