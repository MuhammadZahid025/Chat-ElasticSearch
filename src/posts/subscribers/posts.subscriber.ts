import { SearchService } from 'src/search/search.service';
import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { Posts } from '../enitities/post.entity';

@EventSubscriber()
export class PostsSubscriber implements EntitySubscriberInterface<Posts> {
  constructor(private readonly connection: DataSource, private readonly searchService: SearchService) {
    this.connection.subscribers.push(this);
  }
  listenTo() {
    return Posts;
  }

  async afterInsert(event: InsertEvent<Posts>): Promise<void> {
    const { entity } = event;
    await this.searchService.indexPost(entity);
  }

  async afterUpdate(event: UpdateEvent<Posts>): Promise<void> {
    const { entity } = event;
    await this.searchService.updateInES(entity as Posts);
  }
}
