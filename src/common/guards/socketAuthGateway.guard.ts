import { JwtPayload } from '@common/types/jwtPayload.type';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class SocketAuthGuard {
  constructor(private jwtService: JwtService) {}

  authenticate(socket: Socket): JwtPayload | void {
    const token = socket.handshake.auth?.token;

    if (!token) {
      socket.disconnect();
      return;
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token);
      console.log('jwt verify result ', payload);
      return payload;
    } catch (error) {
      console.log(error);
      socket.disconnect();
    }
  }
}
