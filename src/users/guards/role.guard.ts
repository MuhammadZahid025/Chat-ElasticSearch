import { CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '../enums/role.enum';

export const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context).getContext();
      const user = ctx?.user;
      if (user?.roles === role) {
        return true;
      }
      throw new Error('Invalid user role');
    }
  }
  return mixin(RoleGuardMixin);
};
