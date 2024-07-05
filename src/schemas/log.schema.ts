import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema()
export class Log {
  @Prop()
  method: string;

  @Prop()
  url: string;

  @Prop()
  statusCode: number;

  @Prop()
  responseTime: number;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
