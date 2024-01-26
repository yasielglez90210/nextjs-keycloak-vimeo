/**
 * Sets the attributes for a user in Keycloak.
 *
 * @param {Object} options - The options for setting the attributes.
 * @param {string} options.userId - The ID of the user.
 * @param {Object} options.attributes - The attributes to set for the user.
 * @param {string} options.accessToken - The access token for authentication.
 * @returns {Promise<Response>} - A promise that resolves to the response from the server.
 * @throws {Error} - If there is an error setting the user attributes.
 */
export async function setAttributes({
  userId,
  attributes,
  accessToken,
}: {
  userId: string
  attributes: { [key: string]: string }
  accessToken: string
}) {
  try {
    const url = `${process.env.KEYCLOAK_HOST}/admin/realms/eternity/users/${userId}`

    const body = JSON.stringify({
      attributes: {
        ...attributes,
      },
    })

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: body,
    })

    return res
  } catch (error) {
    console.error(error)
    throw new Error('Failed to set user attributes.')
  }
}
