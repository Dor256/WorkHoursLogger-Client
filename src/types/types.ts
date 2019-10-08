export type TrackLogRequestParams = {
    success: boolean
    inOffice?: boolean,
    bannerMessage?: string
}
export type HeaderProps = {
    text: string
}

export type ButtonProps = {
    trackLogRequest(params: TrackLogRequestParams): void,
    inOffice: boolean,
    userEmail: string
}

export type ButtonGroupProps = {
    children(props: ButtonProps): JSX.Element | null
}