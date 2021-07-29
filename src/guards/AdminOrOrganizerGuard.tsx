import { StorageService, hasRolesIntersection } from '../utils/utils';
import { adminRole, organizerRole } from '../constants';

const AdminOrOrganizerGuard = (to: any, from: any, next: any) => {
  const isAllowed = hasRolesIntersection(
    [adminRole, organizerRole],
    StorageService.getUserData(),
  );

  if (isAllowed) {
    next();
  } else {
    throw new Error('Navigation was prevented in Admin or Organizer Guard');
  }
};

export default AdminOrOrganizerGuard;