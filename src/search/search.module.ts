import { Module } from '@nestjs/common';
import { ClientProvider } from './clientProvider';
import { SearchService } from './search.service';

@Module({
  imports: [],
  providers: [ClientProvider, SearchService],
  exports: [SearchService],
})
export class SearchModule {}
