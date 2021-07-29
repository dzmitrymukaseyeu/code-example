import { ComponentType } from 'react';
import Tournaments from '../pages/admin/tournaments/Tournaments';
import { adminRole, organizerRole } from '../constants';
import Edit from '../pages/admin/tournaments/edit/Edit';
import AllowedToEditTournamentGuard from '../guards/AllowedToEditTournamentGuard';
import AdminOrOrganizerGuard from '../guards/AdminOrOrganizerGuard';

interface RouteValue {
  path: string;
  name: string;
  component: ComponentType;
  rolesAllowed?: string[];
  guards?: any;
}

const Routes: { [key: string]: RouteValue } = {
  AdminTournaments: {
    path: '/admin/tournaments',
    name: 'Мои турниры',
    component: Tournaments,
    rolesAllowed: [adminRole, organizerRole],
    guards: AdminOrOrganizerGuard,
  },
  EditTournaments: {
    path: '/admin/tournaments/edit/:id',
    name: 'Редактирование Турнира',
    component: Edit,
    rolesAllowed: [adminRole, organizerRole],
    guards: [AllowedToEditTournamentGuard, AdminOrOrganizerGuard],
  }
};

export default Routes;