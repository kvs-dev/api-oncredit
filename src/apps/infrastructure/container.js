/**
 * Class representing a dependency injection container.
 * @class
 */
/**
 * Singleton Container class for dependency injection.
 * This class allows you to register and resolve dependencies.
 * 
 * @class Container
 * @example
 * const container = new Container();
 * container.register('service', new Service());
 * const service = container.resolve('service');
 */
class Container {
    constructor() {
        if (!Container.instance) {
            this.dependencies = new Map();
            Container.instance = this;
        }
        return Container.instance;
    }

    register(name, dependency) {
        this.dependencies.set(name, dependency);
    }

    resolve(name) {
        const dependency = this.dependencies.get(name);
        if (!dependency) {
            throw new Error(`Dependency ${name} not found`);
        }
        return dependency;
    }
}

const container = new Container();
export { container };
