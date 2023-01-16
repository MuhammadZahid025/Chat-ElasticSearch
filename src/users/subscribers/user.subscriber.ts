import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { Users } from '../entities/users.entity';
import * as bcrypt from 'bcryptjs';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<Users> {
  constructor(private readonly connection: DataSource) {
    this.connection.subscribers.push(this);
  }

  listenTo() {
    return Users;
  }

  async beforeInsert(event: InsertEvent<Users>): Promise<void> {
    event.entity.password = await bcrypt.hash(event.entity.password, await bcrypt.genSalt());
  }

  async beforeUpdate(event: UpdateEvent<Users>): Promise<void> {
    event.entity.password = await bcrypt.hash(event.entity.password, await bcrypt.genSalt());
  }
}
