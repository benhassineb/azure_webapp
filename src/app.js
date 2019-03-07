export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: [''], name: 'welcome',      moduleId: 'vehicle-vm',      nav: true, title: 'Welcome' },
    ]);

    this.router = router;
  }
}
