// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: {
    base: 'https://public.rongobuy.com/api/v1',
    auth: 'https://auth.rongobuy.com/api/auth/v1',
    main: 'http://localhost:8888/api/v1'
   // main: 'https://test.wigbd.com/api/v1'
  }
};
    // "rxjs": "~6.6.0",

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
