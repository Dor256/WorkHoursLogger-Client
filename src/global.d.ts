type AuthObject = {
    clientId?: string,
    scope?: string,
    prompt?: string
}

type LoadFunction = (api: string, callback: () => void) => void

type OAuthClient = {
    init: (authObject: AuthObject) => Promise<any>
}

type BasicGoogleProfile = {
    getId: () => string,
    getName: () => string,
    getImageUrl: () => string,
    getEmail: () => string
}

type GoogleUser = {
    isSignedIn: () => boolean,
    getBasicProfile: () => BasicGoogleProfile
}

type CurrentGoogleUser = {
    get: () => GoogleUser
}

type AuthInstance = {
    currentUser: CurrentGoogleUser,
    isSignedIn: {
        get: () => boolean,
        listen: (callback: (isSignedIn: boolean) => void) => void
    },
    signIn: (authObject?: AuthObject) => Promise<void>,
    signOut: () => Promise<void>
}

type SignInRenderOptions = {
    scope?: string,
    width?: number,
    height?: number,
    longtitle?: boolean,
    theme?: string
}

type SignInBox = {
    render: (id: string, options: SignInRenderOptions) => void;
}

type GoogleAPI = {
    load: LoadFunction,
    client: OAuthClient,
    auth2: {
        getAuthInstance: () => AuthInstance,
    },
    signin2: SignInBox
}

declare const gapi: GoogleAPI;