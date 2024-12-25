import { User } from '@prisma/client';
import { SanitizedUser } from 'src/types/sanitized';
import * as _ from 'lodash';

export const sanitizedUser = (user: User): SanitizedUser => {
  const resUser = _.omit(user, ['createdAt', 'updatedAt']);
  return resUser;
};
