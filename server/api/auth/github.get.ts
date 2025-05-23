export default defineOAuthGitHubEventHandler({
    config: {
        emailRequired: true,
        scope: ['read:user'],
    },
    async onSuccess(event, { user, tokens }) {
        await setUserSession(event, {
            user: {
                id: user.id.toString(),
                name: user.login,
                image: user.avatar_url
            }
        })
        return sendRedirect(event, '/')
    },
    onError(event, error) {
        console.error('GitHub OAuth error:', error)
        return sendRedirect(event, '/')
    },
})