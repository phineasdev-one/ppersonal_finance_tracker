import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { ApplyUser } from './guard/apply-user.guard';

export const PrivateRoute = () => {
  return applyDecorators(UseGuards(JwtAuthGuard));
};

export const PublicRouteApplyUser = () => {
  return applyDecorators(UseGuards(ApplyUser));
};
