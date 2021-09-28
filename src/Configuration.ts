/**
 * @module Configuration
 */

export interface ConfigurationInterface {
  baseUrl?: string;
  methods?: { [key: string]: (...args: any[]) => any };
}

export interface ConfigurationOptionsInterface {
  baseUrl: string;
  methods?: {};
}

export interface ConfigurationDefaultsInterface {
  baseUrl: string;
  methods?: {};
}

export interface ConfigurationValuesInterface {
  baseUrl: string;
  methods?: {};
}

export class Configuration implements ConfigurationInterface {
  public defaultValue: ConfigurationDefaultsInterface = {
    baseUrl: "http://drupal.dd:8083/",
    methods: {},
  }

  private config: ConfigurationValuesInterface;

  constructor(initialConfig: ConfigurationOptionsInterface = {} as any) {
    this.config = {
      ...this.defaultValue,
      ...initialConfig,
    };
  }

  /**
   * Get the base url of the Drupal.
   *
   * @return {string}
   *   Return the base url of the Drupal.
   */
  public get baseUrl(): string | undefined {
    return this.config.baseUrl;
  }

  /**
   * Get the base url of the Drupal.
   *
   * @param  {string|undefined} url
   *   The base url of the Drupal.
   */
  public set baseUrl(baseUrl: string | undefined) {
    this.valueUpdate({ baseUrl });
  }

  /**
  * Update the configuration values.
  *
  * @param {ConfigurationValuesInterface} config
  *   The config to update.
  */
  public update(configValues: ConfigurationValuesInterface): void {
    this.config = configValues;
  }

  /**
   * Update partials of the configuration.
   *
   * @param {Partial<ConfigurationValuesInterface>} config
   *   The config to update.
   */
  public valueUpdate(configValues: Partial<ConfigurationValuesInterface>): void {
    const configuration = {
      ...this.config,
      ...configValues,
    };

    this.update(configuration);
  }

}