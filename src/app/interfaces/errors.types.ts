export interface TerrorSources {
    path: string,
    message: string
}
export interface TGenericErrorSources {
    statusCode : number
    message: string
    errorSources? : TerrorSources[]
}