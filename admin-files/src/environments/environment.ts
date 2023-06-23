// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: {
     base: 'http://localhost:8888/api/v1'
   // base: 'https://test.wigbd.com/api/v1'
    
  },
  token: 'JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgiLCJ1c2VybmFtZSI6Im5haW0iLCJyb2xlIjoxLCJpYXQiOjE2NTI5NTgxMTZ9.jtKekRsSuZNsJRyzAIOD03lyWRvEsYfwdtW9TKNR_MU'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
