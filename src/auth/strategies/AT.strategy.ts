import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy,ExtractJwt} from 'passport-jwt'

@Injectable()
export class ATStrategy extends PassportStrategy(Strategy, 'at-strategy'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: String(process.env.JWT_SECRET)
        })
    }
}