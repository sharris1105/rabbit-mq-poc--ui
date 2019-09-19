// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = (config) => {
  var customLaunchers = {
    ChromeHeadless: {
      base: 'Chrome',
      flags: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--headless',
        '--disable-gpu',
        '--remote-debugging-port=9222',
      ],
    },
    FirefoxHeadless: {
      base: 'Firefox',
      flags: [
        '-headless',
      ]
    }
  };

  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser,
    },

    // TODO: implement reasonable thresholds
    // coverageIstanbulReporter: {
    //   dir: require('path').join(__dirname, 'coverage'),
    //   reports: ['html', 'lcovonly'],
    //   fixWebpackSourcePaths: true,
    //   thresholds: {
    //     statements: 80,
    //     lines: 80,
    //     branches: 80,
    //     functions: 80
    //   }
    // },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    concurrency: 1,
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    singleRun: true
  });
};
