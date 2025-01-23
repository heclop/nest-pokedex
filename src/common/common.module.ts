import { Module } from '@nestjs/common';
import { AxiosAdpater } from './adapters/axios.adpater';

@Module({
    providers: [ AxiosAdpater ],
    exports: [ AxiosAdpater]
})
export class CommonModule {}
