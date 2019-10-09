export type TrackLogRequestParams = {
    success: boolean
    inOffice?: boolean,
    bannerMessage?: string
}
export type HeaderProps = {
    text: string
}

export type ButtonActionProps = {
    trackLogRequest(params: TrackLogRequestParams): void,
    inOffice: boolean,
    userEmail: string
}

export type  ButtonProps = {
    className: string,
    textContent: string,
    onClick(): void
}

export type ContainerProps = {
    className: string,
    children?: React.ReactNode
}