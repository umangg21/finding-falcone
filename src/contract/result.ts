export interface requestData {
    token: string,
    planet_names: string[],
    vehicle_names: string[],
}

export interface responseData {
    planet_name?: string,
    status: string
}