import { createClient } from 'redis';

export const client = createClient({
    password: 'NS26PXy62iUVbOMJ3LiBsxMVlw7KHGMn',
    socket: {
        host: 'redis-14244.c263.us-east-1-2.ec2.cloud.redislabs.com',
        port: 14244
    }
});

client.on('error', err => console.log('Redis Client Error', err));
