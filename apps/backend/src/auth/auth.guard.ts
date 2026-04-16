import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly JWTService : JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
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

    private extractTokenFromHeader(request : Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}