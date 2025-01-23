export interface HttpAdapter{
    get<t>( url: string ): Promise<t>;
}