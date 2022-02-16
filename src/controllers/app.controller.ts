import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('apple-app-site-association')
  appleAppSiteAssociation() {
    return {
      applinks: {
        apps: [],
        details: [
          {
            appID: '94FLWD5X32.com.ydays.easyselling',
            paths: ['/admin/reset-password', '/vehicles/share'],
          },
        ],
      },
      webcredentials: {
        apps: ['94FLWD5X32.com.ydays.easyselling'],
      },
    };
  }
}
