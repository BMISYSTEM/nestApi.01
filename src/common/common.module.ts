import { Module } from '@nestjs/common';
import { AxiosApdater } from './adapter/axios.adapter';

@Module({
    providers:[AxiosApdater],
    exports:[AxiosApdater]
})
export class CommonModule {}
