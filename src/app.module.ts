import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { FireModule } from './fire/fire.module';
import { UsersModule } from './users/users.module';

const envFilePath = process.env.NODE_ENV !== 'production' ? '.env.development' : undefined;

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath }),
    GraphQLModule.forRoot<ApolloDriverConfig>({ driver: ApolloDriver }),
    FireModule,
    UsersModule,
  ],
})
export class AppModule {}
