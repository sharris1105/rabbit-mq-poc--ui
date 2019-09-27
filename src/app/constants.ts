import { environment } from 'src/environments/environment';

export class Constants {
  static WRAPPER_PATH_BASE = environment.local ?
    'http://localhost:4201/api/' :
    'http://devservices.practicevelocity.com/angulartemplate/api/';

  static API_PATH_BASE = environment.local ?
    'http://localhost:5000/api/' :
    'http://devservices.practicevelocity.com/messagingapi/api/';
  static CURRENT_SESSION = 'currentSession';
  static JWT_TOKEN_PREFIX = 'Bearer';
  static PATH_BASE = '/';
  static CURRENT_USER = 'user';
  static RABBITMQ = {
    API_PATH_BASE: 'http://localhost:15672/',
    cluster: 'rabbit@PVBMPRL0587.pv.local',
    user: 'guest',
    password: 'guest'
  };
}
