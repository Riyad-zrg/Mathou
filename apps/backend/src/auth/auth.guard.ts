import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
import { IS_PUBLIC_KEY } from "../common/decorators/public.decorator.js";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly JWTService : JwtService, private reflector: Reflector){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if(isPublic){
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = request.cookies?.access_token;
        if(!token){
            throw new UnauthorizedException('The request token does not exists');
        }

        try{
            const payload = await this.JWTService.verifyAsync(token);
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException('The token verification failed.');
        }

        return true;
    }
}