import { Injectable, Param } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hello World</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(to right, #ff7e5f, #feb47b);
            color: white;
            font-family: Arial, sans-serif;
          }
          h1 {
            font-size: 4em;
            margin: 0;
            animation: fadeIn 2s;
          }
          p {
            font-size: 1.5em;
            animation: fadeIn 3s;
            opacity: 0;
            transition: opacity 1s;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        </style>
      </head>
      <body>
        <h1>Hello World!</h1>
        <p>Welcome to the exciting NestJS application!</p>
      </body>
      </html>
    `;
  }

  getHelloMessage(): string {
    return 'Hello from the new route!';
  }

  getHelloMessages(@Param('name') name: string): string {
    return `Hello, ${name}!`;
  }
}
